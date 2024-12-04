import React from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface SelectBoxProps {
  title: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
  options: { label: string; value: string }[];
  error?: string;
}

const SelectBox: React.FC<SelectBoxProps> = ({
  title,
  selectedValue,
  onValueChange,
  options,
  error,
}) => {
  return (
    <View className="space-y-2">
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

      <View className="relative w-full h-12 bg-black-100 rounded-2xl border border-black-200">
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={{
            height: "100%",
            width: "100%",
            color: "#fff",
          }}
        >
          {options.map((option) => (
            <Picker.Item key={option.value} label={option.label} value={option.value} />
          ))}
        </Picker>
      </View>

      {error && <Text className="text-red-500 text-sm">{error}</Text>}
    </View>
  );
};

export default SelectBox;
