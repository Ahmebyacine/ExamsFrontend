import React, { useState, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import MathJax from 'react-mathjax3';

const ExamCreator = () => {
  const [title, setTitle] = useState('My Exam');
  const [items, setItems] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const printRef = useRef(null);

  const addExercise = () => {
    setItems([...items, { id: Date.now().toString(), type: 'exercise', content: '', answer: '' }]);
  };

  const deleteExercise = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const addImage = (id, event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setItems(items.map(item => 
          item.id === id 
            ? { ...item, imageUrl: e.target.result, imagePosition: 'center' } 
            : item
        ));
      };
      reader.readAsDataURL(file);
    }
  };

  const updateItem = (id, field, value) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    setItems(newItems);
  };

  const handlePrint = () => {
    if (printRef.current) {
      const printContents = printRef.current.innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Exam Creator</h1>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Exam Title"
          className="w-full p-2 mb-6 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="exam">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div 
                        ref={provided.innerRef} 
                        {...provided.draggableProps} 
                        {...provided.dragHandleProps} 
                        className="mb-6 border border-gray-200 rounded-md p-4 bg-white shadow-sm"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-xl font-semibold text-gray-800">
                            {item.type === 'exercise' ? `Exercise ${index + 1}` : 'Image'}
                          </h3>
                          <button
                            onClick={() => deleteExercise(item.id)}
                            className="text-red-500 hover:text-red-700 focus:outline-none"
                          >
                            Delete
                          </button>
                        </div>
                        {item.type === 'exercise' && (
                          <>
                            <textarea
                              value={item.content}
                              onChange={(e) => updateItem(item.id, 'content', e.target.value)}
                              placeholder="Enter question (you can use LaTeX for math expressions)"
                              className="w-full p-2 mb-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              rows={4}
                            />
                            <textarea
                              value={item.answer}
                              onChange={(e) => updateItem(item.id, 'answer', e.target.value)}
                              placeholder="Enter answer (you can use LaTeX for math expressions)"
                              className="w-full p-2 mb-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              rows={4}
                            />
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => addImage(item.id, e)}
                              className="mb-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            <div className={`text-${item.imagePosition}`}>
                              {item.imageUrl && (
                                <img src={item.imageUrl} alt="Uploaded content" className="max-w-full h-auto mb-2" />
                              )}
                              <select
                                value={item.imagePosition}
                                onChange={(e) => updateItem(item.id, 'imagePosition', e.target.value)}
                                className="p-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              >
                                <option value="left">Left</option>
                                <option value="center">Center</option>
                                <option value="right">Right</option>
                              </select>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className="flex space-x-2 mb-6">
          <button 
            onClick={addExercise} 
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
          >
            Add Exercise
          </button>
          <button 
            onClick={() => setShowPreview(!showPreview)} 
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors"
          >
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </button>
          <button 
            onClick={handlePrint} 
            className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors"
          >
            Print Exam
          </button>
        </div>

        {showPreview && (
          <div ref={printRef} className="mt-8 border border-gray-200 rounded-md p-6 bg-white shadow-sm">
            <MathJax.Context input="tex">
              <div>
                <h1 className="text-3xl font-bold mb-6 text-gray-800">{title}</h1>
                {items.map((item, index) => (
                  <div key={item.id} className="mb-6">
                    {item.type === 'exercise' ? (
                      <>
                        <h2 className="text-2xl font-semibold mb-2 text-gray-800">Exercise {index + 1}</h2>
                        <MathJax.Node>{item.content}</MathJax.Node>
                        <p className="mt-4 font-bold text-gray-700">Answer:</p>
                        <MathJax.Node>{item.answer || ''}</MathJax.Node>
                        {item.imageUrl && (
                          <div className={`mt-4 text-${item.imagePosition}`}>
                            <img src={item.imageUrl} alt="Uploaded content" className="max-w-full h-auto" />
                          </div>
                        )}
                      </>
                    ) : (
                      <img src={item.imageUrl} alt="Uploaded content" className="max-w-full h-auto" />
                    )}
                  </div>
                ))}
              </div>
            </MathJax.Context>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamCreator;