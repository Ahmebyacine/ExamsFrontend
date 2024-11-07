// Component.js
import React, { useState } from 'react';
import { FormProvider } from './FormContext';
import GenralInfo from './GenralInfo';
import materialDetails from './materialDetails';
import Confirmation from './Confirmation';
import ExerciseDetails from './ExerciseDetails';

const Component = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const steps = [
    { title: 'Genral Information', component: GenralInfo },
    { title: 'Material Details', component: materialDetails },
    { title: 'Execrise Details', component: ExerciseDetails },
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