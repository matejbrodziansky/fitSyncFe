import { useState } from "react";
import { Link, router, Redirect } from "expo-router";
import { z } from "zod";
import { Text, View, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButtom'
import { images } from '@/constants'
import { Alert } from 'react-native'
import { signIn, saveToken, saveRefreshToken } from "@/service/api";
// import { useGlobalContext } from '@/lib/GlobalProvider';
// import { useEffect } from "react";



const SignIn = () => {
  // const { isLogged, isLoading } = useGlobalContext();

  // alert(isLogged);
  // if (!isLoading && isLoggedIn) return <Redirect href={'/index'} />

  // useEffect(() => {
  //   Alert.alert(isLogged);
  //   if (isLogged) {
  //     router.push("/");
  //   }
  // }, [isLogged]);

  const [isTouched, setTouched] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "test@gmail.com",
    password: "test@gmail.com",
  });


  const schema = z.object({
    email: z.string().email("Invalid email format").min(6, "Email must be at least 6 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });

  const validate = () => {
    try {
      schema.parse(form);
      return true;
    } catch (error) {
      return false;
    }
  };

  const submit = async () => {
    setTouched(true);
    const isValid = validate();
    if (!isValid) {
      Alert.alert("Validation Error", "Please correct the errors in the form.");
      return;
    }
    setSubmitting(true);

    try {
      const response = await signIn({
        username: form.email,
        password: form.password,
      });

      if (response.success) {
        await saveToken(response.token);
        await saveRefreshToken(response.refresh_token);

        router.push("/home");
      } else {
        Alert.alert("Error", "Invalid login credentials");
      }
    } catch (error) {
      Alert.alert("Error", error.message || "Login failed.");
    } finally {
      setSubmitting(false);
    }
  };



  const emailError = isTouched ? schema.safeParse(form).error?.formErrors.fieldErrors.email?.[0] : undefined;
  const passwordError = isTouched ? schema.safeParse(form).error?.formErrors.fieldErrors.password?.[0] : undefined;

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center items-center  min-h-[83vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[155px] h-[100px]"
          />

          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Log In
          </Text>


          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
            error={emailError}
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            error={passwordError}
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7 w-full"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
