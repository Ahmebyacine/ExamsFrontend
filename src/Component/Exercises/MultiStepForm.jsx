// Component.js
import React, { useState } from 'react';
import { FormProvider } from './FormContext';
import PersonalInfo from './PersonalInfo';
import AccountDetails from './AccountDetails';
import Confirmation from './Confirmation';

const Component = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 2));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const steps = [
    { title: 'Personal Information', component: PersonalInfo },
    { title: 'Account Details', component: AccountDetails },
    { title: 'Confirmation', component: Confirmation },
  ];

  const renderStep = () => {
    const StepComponent = steps[currentStep].component;
    return <StepComponent onNext={nextStep} onPrev={prevStep} />;
  };

  return (
    <FormProvider>
      <div className="md:max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Exercise Details</h2>
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`text-sm font-medium ${index <= currentStep ? 'text-blue-600' : 'text-gray-400'}`}
              >
                {step.title}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-500 ease-out relative"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-8">{renderStep()}</div>
      </div>
    </FormProvider>
  );
};

export default Component;