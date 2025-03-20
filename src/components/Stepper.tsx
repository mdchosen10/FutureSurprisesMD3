import React, { FC } from "react";
import StepperHorizontal from "react-stepper-horizontal";

const steps = [
  { title: "Create Account" },
  { title: "Add Recipients" },
  { title: "Add Payment Method" },
  { title: "Confirmation" },
];

interface StepperProps {
  stepperColor?: string;
  activeStep: number;
}

const Stepper: FC<StepperProps> = props => {
  const { stepperColor, activeStep } = props;
  return (
    <StepperHorizontal
      steps={steps}
      size={26}
      circleFontSize={14}
      titleFontSize={14}
      activeStep={activeStep}
      activeColor={stepperColor || "#511f4a"}
      completeColor="#e0e0e0"
      barStyle="dashed"
      completeBarColor={stepperColor || "#511f4a"}
      defaultBarColor={stepperColor || "#511f4a"}
      defaultBorderColor={stepperColor || "#511f4a"}
      completeBorderColor={stepperColor || "#511f4a"}
      activeBorderColor=""
      defaultBorderWidth={1}
      completeTitleOpacity={"0"}
      defaultTitleOpacity={"0"}
    />
  );
};

export default Stepper;
