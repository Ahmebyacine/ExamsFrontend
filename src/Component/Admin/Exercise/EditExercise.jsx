import ImageManager from "../../UI/ImageManager";
import { useLanguage } from "../../utils/LanguageContext";

const positionOptions = [
  { label: 'Left', value: 'left' },
  { label: 'Right', value: 'right' },
  { label: 'Bottom', value: 'bottom' },
  { label: 'Top', value: 'top' },
];
const twoImageOptions = [
  { label: 'Bottom', value: 'bottom' },
  { label: 'Top', value: 'top' },
];
const EditExercise = ({formData, setFormData }) => {
  const { t } = useLanguage();
  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSectionChange = (index, field, value) => {
    const updatedSections = formData.exercise.map((section, i) =>
      i === index ? { ...section, [field]: value } : section
    );
    setFormData((prevData) => ({
      ...prevData,
      exercise: updatedSections,
    }));
  };

  const handleQuestionChange = (sectionIndex, questionIndex, field, value) => {
    const updatedSections = formData.exercise.map((section, i) => {
      if (i === sectionIndex) {
        const updatedQuestions = section.questions.map((q, j) =>
          j === questionIndex ? { ...q, [field]: value } : q
        );
        return { ...section, questions: updatedQuestions };
      }
      return section;
    });
    setFormData((prevData) => ({
      ...prevData,
      exercise: updatedSections,
    }));
  };

  const handleAddQuestion = (sectionIndex) => {
    const updatedSections = formData.exercise.map((section, i) =>
      i === sectionIndex
        ? { ...section, questions: [...section.questions, { question: '', answer: '' }] }
        : section
    );
    setFormData((prevData) => ({
      ...prevData,
      exercise: updatedSections,
    }));
  };

  const handleRemoveQuestion = (sectionIndex, questionIndex) => {
    const updatedSections = formData.exercise.map((section, i) => {
      if (i === sectionIndex) {
        const updatedQuestions = section.questions.filter((_, j) => j !== questionIndex);
        return { ...section, questions: updatedQuestions };
      }
      return section;
    });
    setFormData((prevData) => ({
      ...prevData,
      exercise: updatedSections,
    }));
  };

  const handleImageUpload = (index,imageKey, event) => {  
    const files = event.target.files;
  
    if (files && files.length > 0) {
      const updatedSections = [...formData.exercise];
      const reader = new FileReader();
  
      reader.onload = (e) => {
        updatedSections[index] = {
          ...updatedSections[index],
          [imageKey]: e.target.result,
        };
  
        setFormData((prevData) => ({
          ...prevData,
          exercise: updatedSections,
        }));
      };
  
      reader.readAsDataURL(files[0]);
    }
  };
  
  const handleDeleteImage = (index, imageKey) => {
    const updatedSections = [...formData.exercise];
    updatedSections[index] = {
      ...updatedSections[index],
      [imageKey]: null,
    };
  
    setFormData((prevData) => ({
      ...prevData,
      exercise: updatedSections,
    }));
  };
  
  const handleAddSection = () => {
    const newSection = {
      content: '',
      questions: [{ question: '', answer: '' }],
      image: null,
      secondImage: null,
      imagePosition: 'bottom',
    };
    setFormData((prevData) => ({
      ...prevData,
      exercise: [...prevData.exercise, newSection],
    }));
  };

  const handleRemoveSection = (index) => {
    const updatedSections = formData.exercise.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      exercise: updatedSections,
    }));
  };
  return (
    <div key={formData._id} className="mx-8 my-10 py-8 bg-white rounded-lg">
      <form className="space-y-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t("Title")}:</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter content"
          />
        </div>
        {formData.exercise.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-6 rounded-lg shadow-inner">
            <div>
              <h1 className='text-xl font-bold text-center'>{t("Section")} {sectionIndex+1}</h1>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t("Content")}:</label>
              <textarea
                value={section.content}
                onChange={(e) => handleSectionChange(sectionIndex, 'content', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                rows="3"
                placeholder="Enter content"
              />
            </div>
  
            {section.questions.map((q, questionIndex) => (
              <div key={questionIndex} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("Question")} {questionIndex+1}:</label>
                  <textarea
                    value={q.question}
                    onChange={(e) => handleQuestionChange(sectionIndex, questionIndex, 'question', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    rows="1"
                    placeholder="Enter question"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("Answer")} {questionIndex+1}:</label>
                  <textarea
                    value={q.answer}
                    onChange={(e) => handleQuestionChange(sectionIndex, questionIndex, 'answer', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    rows="1"
                    placeholder="Enter answer"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveQuestion(sectionIndex, questionIndex)}
                  className="text-sm text-red-600 hover:text-red-800 mt-2"
                >
                  {t("rmQuestion")} {questionIndex+1}
                </button>
              </div>
            ))}
  
            <button
              type="button"
              onClick={() => handleAddQuestion(sectionIndex)}
              className="text-sm text-blue-600 hover:text-blue-800 mt-4"
            >
              {t("Add_Question")} {section.questions.length+1}
            </button>
            <div className="mt-4">
            <div className="flex justify-center">
              <div className="m-3 my-auto">
               <ImageManager
                 image={section.image}
                 onDelete={() => handleDeleteImage(sectionIndex, 'image')}
                 onUpload={(event) => handleImageUpload(sectionIndex, 'image', event)}
               />
              </div>
              <div className="m-3 my-auto">
               <ImageManager
                 image={section.secondImage}
                 onDelete={() => handleDeleteImage(sectionIndex, 'secondImage')}
                 onUpload={(event) => handleImageUpload(sectionIndex, 'secondImage', event)}
               />
              </div>
            </div>
            </div>
            {section.image && (
              <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">{t("Image_Position")}:</label>
              <select
                value={section.imagePosition}
                onChange={(e) => handleSectionChange(sectionIndex, 'imagePosition', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                {section.secondImage
                 ? twoImageOptions.map((option) => (
                   <option key={option.value} value={option.value}>
                     {option.label}
                   </option>
                 ))
                 : positionOptions.map((option) => (
                   <option key={option.value} value={option.value}>
                     {option.label}
                   </option>
                 ))}
              </select>
            </div>
            )}
           {
             sectionIndex !== 0 && (
               <button
                 type="button"
                 onClick={() => handleRemoveSection(sectionIndex)}
                 className="text-sm text-red-600 hover:text-red-800 mt-4"
               >
                 {t("rmSection")} {sectionIndex + 1}
               </button>
             )
           }
            
          </div>
        ))}
  
        <button
          type="button"
          onClick={handleAddSection}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
        >
          Add Section
        </button>
      </form>
    </div>
  );
  
}
export default EditExercise;