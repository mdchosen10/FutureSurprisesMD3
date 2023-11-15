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
      activeColor={stepperColor || "#643e74"}
      completeColor="#e0e0e0"
      barStyle="dashed"
      completeBarColor={stepperColor || "#643e74"}
      defaultBarColor={stepperColor || "#643e74"}
      defaultBorderColor={stepperColor || "#643e74"}
      completeBorderColor={stepperColor || "#643e74"}
      activeBorderColor=""
      defaultBorderWidth={1}
      completeTitleOpacity={"0"}
      defaultTitleOpacity={"0"}
    />
  );
};

export default Stepper;
