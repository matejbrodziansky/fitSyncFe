import { z } from "zod";
import { useState } from "react";
import { Link, router } from "expo-router";
import { Text, View, ScrollView, Image, Alert, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButtom";
import { registerUser } from "@/service/api";
import { images } from "@/constants";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { checkEmailExists } from "@/service/api";
import Checkbox from 'expo-checkbox';


export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

const data = Object.keys(Gender).map(key => ({
  label: Gender[key as keyof typeof Gender],
  value: Gender[key as keyof typeof Gender],
}));

const GenderEnum = z.nativeEnum(Gender);

const StepOneSchema = z.object({
  firstname: z.string().min(2, "First Name is too short"),
  lastname: z.string().min(2, "Last Name is too short"),
  email: z.string().email("Invalid email"),
  confirmEmail: z.string().email("Invalid confirmation email"),
  phoneNumber: z.string().min(10, "Invalid phone number"),
  plainPassword: z.object({
    first: z.string().min(6, "Password must be at least 6 characters long"),
    second: z.string(),
  }).refine((data) => data.first === data.second, {
    message: "Passwords do not match",
    path: ["second"],
  }),
}).refine((data) => data.email === data.confirmEmail, {
  message: "Emails do not match",
  path: ["confirmEmail"],
});

const StepTwoSchema = z.object({
  height: z.number().min(50, "Height must be realistic").max(300, "Unrealistic height"),
  weight: z.number().min(10, "Weight must be realistic").max(300, "Unrealistic weight"),
  gender: GenderEnum,
  birthdate: z.string().nonempty("Birthdate is required"),
  trainingPlace: z.string().optional(),
  agreeTerms: z.boolean().refine((value) => value === true, {
    message: "You must agree to the terms",
  }),
  agreePrivacy: z.boolean().refine((value) => value === true, {
    message: "You must agree to the privacy policy",
  }),

});

interface Form {
  firstname: string;
  lastname: string;
  email: string;
  confirmEmail: string;
  phoneNumber: string;
  plainPassword: {
    first: string;
    second: string;
  };
  agreeTerms: boolean;
  agreePrivacy: boolean;
  gender: string;
  birthdate: string;
  trainingPlace: string;
  height: number;
  weight: number;
}

type AgreeFieldProps = {
  title: string;
  value: boolean;
  key: string;
  error: string | undefined;
  handleCheckboxChange: () => void;
};

const AgreeField = ({ title, value, error, handleCheckboxChange }: AgreeFieldProps) => (
  <View className="flex-row items-center mt-3">
    <Checkbox
      value={value}
      onValueChange={handleCheckboxChange}
      color="white"
    />
    <Text className="text-white ml-2">{title}</Text>

    {error && <Text className="text-red-500 ml-2">{error}</Text>}
  </View>
);


const SignUp: React.FC = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const randomNum = Math.random().toString(36).substring(7);
  const [form, setForm] = useState<Form>({
    firstname: "Mates",
    lastname: "Brodz",
    email: randomNum + "mates@gmail.com",
    confirmEmail: randomNum + "mates@gmail.com",
    // email: "2h4kspamates@gmail.com",
    // confirmEmail: "2h4kspamates@gmail.com",
    phoneNumber: "09440621718",
    plainPassword: { first: "securePassword123", second: "securePassword123" },
    gender: Gender.Male,
    birthdate: "1991-01-01",
    trainingPlace: "Home gym",
    height: 100,
    weight: 76,
    agreeTerms: false,
    agreePrivacy: false,
  });
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderFormFieldsStepOne = () => [
    { title: "First Name", value: form.firstname, handleChangeText: (e: string) => setForm({ ...form, firstname: e }), otherStyles: "mt-7", placeholder: "First Name", error: errors.firstname },
    { title: "Last Name", value: form.lastname, handleChangeText: (e: string) => setForm({ ...form, lastname: e }), otherStyles: "mt-7", placeholder: "Last Name", error: errors.lastname },
    { title: "Email", value: form.email, handleChangeText: (e: string) => setForm({ ...form, email: e }), otherStyles: "mt-7", placeholder: "Email", keyboardType: "email-address", error: errors.email },
    { title: "Confirm Email", value: form.confirmEmail, handleChangeText: (e: string) => setForm({ ...form, confirmEmail: e }), otherStyles: "mt-7", placeholder: "Confirm Email", keyboardType: "email-address", error: errors.confirmEmail },
    { title: "Phone Number", value: form.phoneNumber, handleChangeText: (e: string) => setForm({ ...form, phoneNumber: e }), otherStyles: "mt-7", placeholder: "Phone Number", error: errors.phoneNumber, keyboardType: "phone-pad" },
    { title: "Password", value: form.plainPassword.first, handleChangeText: (e: string) => setForm({ ...form, plainPassword: { ...form.plainPassword, first: e } }), otherStyles: "mt-7", placeholder: "Password", error: errors["plainPassword.first"] },
    { title: "Confirm Password", value: form.plainPassword.second, handleChangeText: (e: string) => setForm({ ...form, plainPassword: { ...form.plainPassword, second: e } }), otherStyles: "mt-7", placeholder: "Confirm Password", error: errors["plainPassword.second"] },
    {
      title: "Next",

      handlePress: handleNext,
      type: "button"
    },
  ]

  const renderFormFieldsStepTwo = () => [
    { title: "Height (cm)", value: form.height.toString(), handleChangeText: (e: string) => setForm({ ...form, height: parseInt(e) }), otherStyles: "mt-7", placeholder: "Height", keyboardType: "numeric", error: errors.height },
    { title: "Weight (kg)", value: form.weight.toString(), handleChangeText: (e: string) => setForm({ ...form, weight: parseInt(e) }), otherStyles: "mt-7", placeholder: "Weight", keyboardType: "numeric", error: errors.weight },
    { title: "Birthdate", value: form.birthdate, handleChangeText: (e: string) => setForm({ ...form, birthdate: e }), otherStyles: "mt-7", keyboardType: "numeric", error: errors.birthdate },
    { title: "Gender", value: form.gender, setGender: (e: Gender) => setForm({ ...form, gender: e }), error: errors.gender },
    { title: "Training Place", value: form.trainingPlace, handleChangeText: (e: string) => setForm({ ...form, trainingPlace: e }), otherStyles: "mt-7", placeholder: "Training Place", error: errors.trainingPlace },
    {
      type: "agreeTerms",
      component: (
        <AgreeField
          title="Súhlasím s podmienkami"
          value={form.agreeTerms}
          key="agreeTerms"
          error={errors.agreeTerms}
          handleCheckboxChange={() => setForm({ ...form, agreeTerms: !form.agreeTerms })}
        />
      ),
    },

    // Použití AgreeField komponenty pre "Súhlasím s ochranou osobných údajov"
    {
      type: "agreePrivacy",
      component: (
        <AgreeField
          title="Súhlasím s ochranou osobných údajov"
          value={form.agreePrivacy}
          key="agreePrivacy"
          error={errors.agreePrivacy}
          handleCheckboxChange={() => setForm({ ...form, agreePrivacy: !form.agreePrivacy })}
        />
      ),
    },
    {
      title: "Back",
      value: form.agreeTerms,
      handlePress: handleBack,
      type: "button"

    },
    {
      title: "Submit",
      value: form.agreeTerms,
      handlePress: submit,
      type: "button"
    },
  ]

  const renderAgreeTerms = () => {
    return (
      <View className="flex-row items-center mt-3">
        <Checkbox
          value={form.agreeTerms}
          onValueChange={() => setForm({ ...form, agreeTerms: !form.agreeTerms })}
          color="white"
        />
        <Text className="text-white ml-2">Súhlasím s podmienkami</Text>
      </View>
    )
  }

  const renderAgreePrivacy = () => {
    return (
      <View className="flex-row items-center mt-3">
        <Checkbox
          value={form.agreePrivacy}
          onValueChange={() => setForm({ ...form, agreePrivacy: !form.agreePrivacy })}
          color="white"
        />
        <Text className="text-white ml-2">Súhlasím s ochranou osobných údajov</Text>
      </View>
    )
  }


  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (!isValid) return;

    setCurrentStep((prev) => prev + 1);
  };
  const handleBack = () => setCurrentStep((prev) => prev - 1);

  const validateCurrentStep = async (): Promise<boolean> => {
    try {
      if (currentStep === 1) {
        StepOneSchema.parse(form);
        const emailExists = await checkEmailExists(form.email);
        if (emailExists.data.exists === true) {
          setErrors((prevErrors) => ({ ...prevErrors, email: "This email is already registered" }));
          return false;
        } else {
          setErrors((prevErrors) => {
            const updatedErrors = { ...prevErrors };
            delete updatedErrors.email;
            return updatedErrors;
          });
        }
      } else if (currentStep === 2) {
        StepTwoSchema.parse(form);
      }
      setErrors({});
      return true;
    } catch (e) {
      if (e instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        e.errors.forEach((err) => {
          const key = err.path.join(".");
          fieldErrors[key] = err.message;
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };


  const handleEmailBlur = async () => {

    const emailExists = await checkEmailExists(form.email);
    if (emailExists) {
      setErrors({ ...errors, email: "This email is already registered" });

    } else {
      const updatedErrors = { ...errors };
      delete updatedErrors.email;
      setErrors(updatedErrors);
    }
  };

  const submit = async () => {
    const isValid = await validateCurrentStep();
    if (!isValid) return;

    setSubmitting(true);

    try {
      const response = await registerUser(form);
      router.replace("sign-in");
      Alert.alert("Success", "User registered successfully");
      console.log("Response:", response);
    } catch (error) {
      console.log("Error:", error);
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
  };



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1e1e1e" }}>
      <View className="w-full items-center mt-5">
        <Image
          source={images.logo}
          resizeMode="contain"
          className="w-[125px] h-[70px]"
        />
      </View>

      <Text style={{ fontSize: 24, fontWeight: "600", color: "#fff", textAlign: "center", marginVertical: 10 }}>
        {currentStep === 1 ? "Registrácia" : "Hlavné údaje"}
      </Text>

      <FlatList
        data={
          currentStep === 1
            ? renderFormFieldsStepOne()
            : renderFormFieldsStepTwo()
        }
        renderItem={({ item }) => {
          if (item.type === "agreeTerms" || item.type === "agreePrivacy") {
            return item.component; // Použijeme staticky definovaný AgreeField
          }
          if ('type' in item && item.type === "button") {
            return (
              <CustomButton
                title={item.title}
                handlePress={item.handlePress}
                containerStyles="mt-3 bg-gray-500"
              />
            );
          }
          else if (item.title === "Gender") {
            return (
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={[styles.selectedTextStyle, { color: 'white' }]}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select item' : '...'}
                searchPlaceholder="Search..."
                value={form.gender}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setForm({ ...form, gender: item.value });
                }}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color={isFocus ? 'blue' : 'white'}
                    name="Safety"
                    size={20}
                  />
                )}
              />
            );
          }
          return (
            <FormField
              title={item.title}
              value={item.value}
              handleChangeText={item.handleChangeText}
              otherStyles={item.otherStyles}
              placeholder={item.placeholder}
              error={item.error}
              keyboardType={item.keyboardType}
              handleBlur={item.title === "Email" ? handleEmailBlur : undefined}
            />
          );
        }}

        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 10 }}
      />
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'white',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});