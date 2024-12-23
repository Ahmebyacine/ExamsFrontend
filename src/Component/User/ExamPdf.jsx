import { useState} from "react";
import {Download } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Modal from "../UI/Modal";
import ExamDocument from "../ToolsPDF/ExamDocument";

const ExamPdf = ({ exercises }) => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [year, setYear] = useState("2024");
  const [level, setLevel] = useState("الاولى ابتدائي");
  const [matriel, setMatriel] = useState("اللغة العربية");
  const [trimester, setTrimester] = useState("الفصل الاول");

  const handelSubmit =(event)=>{
    event.preventDefault();
  }
  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-4 bg-indigo-700 inline-flex right-4 text-white py-2 px-4 rounded hover:bg-indigo-600"
      >
        <span className="pr-2">
        <Download />
        </span>
         Download Exercises as PDF
      </button>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="popover-content min-w-80 sm:min-w-[300px] sm:max-w-[600px]">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Add exam details</h3>
              </div>
              <form className="grid gap-4" onSubmit={handelSubmit}>
                <div>
                  <div className="mb-4">
                    <label htmlFor="year" className="block text-sm font-bold text-gray-700 mb-2">
                      year:
                    </label>
                    <input
                      type="text"
                      name="year"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="block w-full mb-2 border border-muted p-2 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="level" className="block text-sm font-bold text-gray-700 mb-2">
                      level:
                    </label>
                    <input
                      type="text"
                      name="level"
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                      className="block w-full mb-2 border border-muted p-2 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="matriel" className="block text-sm font-bold text-gray-700 mb-2">
                     matriel:
                    </label>
                    <input
                      type="text"
                      name="matriel"
                      value={matriel}
                      onChange={(e) => setMatriel(e.target.value)}
                      className="block w-full mb-2 border border-muted p-2 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="trimester" className="block text-sm font-bold text-gray-700 mb-2">
                    trimester:
                    </label>
                    <input
                      type="text"
                      name="trimester"
                      value={trimester}
                      onChange={(e) => setTrimester(e.target.value)}
                      className="block w-full mb-2 border border-muted p-2 rounded"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded text-sm text-white font-medium ring-offset-background  bg-indigo-700 h-10"
                >
                  <PDFDownloadLink document={
                  <ExamDocument 
                  exam={exercises}  
                  year={year} 
                  level={level} 
                  material={matriel} 
                  trimester={trimester} />} 
                  fileName="exam.pdf">
                  {({ loading }) => (loading ? 'Loading document...' : 'Download Exam PDF')}
                  </PDFDownloadLink>
                </button>
              </form>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ExamPdf;