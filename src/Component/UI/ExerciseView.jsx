import React from 'react';
import {isRTL} from '../utils/detectArabic';

const ExerciseView = ({ item,itemIndex}) => {
  const textDirection = isRTL(item.content) ? "rtl" : "ltr";
  const positionClassesMap = {
    right: 'flex-row',
    left: 'flex-row-reverse',
    top: 'flex-col-reverse',
    bottom: 'flex-col',
  };

  return (
    <div dir={textDirection} >
      <div className={`flex ${positionClassesMap[item.imagePosition] || ''} mb-5 mx-4 md:mx-8`}>
        <div className="exercise-content">
          <p className="content text-[length:var(--font-size)] whitespace-pre-wrap text-black mt-3 mb-4">
            {item.content}
          </p>
          <ol className="list-decimal ml-5 space-y-3 text-black leading-relaxed">
            {item.questions.map((q, qIndex) => (
              <li key={qIndex} className="whitespace-pre-wrap mb-2">
                {q.question}
              </li>
            ))}
          </ol>
        </div>
        <div className="flex align-center">
          {item.image && (
            <div
              className={`${
                item.image && item.secondImage ? 'w-1/2 m-3 my-auto' : 'w-2/3 mx-auto'
              } mt-6`}
            >
              <img
                src={item.image}
                alt={`Exercise illustration ${itemIndex}`}
                className="rounded shadow-md"
              />
            </div>
          )}
          {item.secondImage && (
            <div
              className={`${
                item.image && item.secondImage ? 'w-1/2 m-3 my-auto' : 'w-2/3 mx-auto'
              }`}
            >
              <img
                src={item.secondImage}
                alt={`Exercise illustration n2 ${itemIndex}`}
                className="rounded shadow-md"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExerciseView;