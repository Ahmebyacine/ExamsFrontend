import { useState} from "react";
import { Download } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Modal from "../../Component/Modal";
import ExamDocument from "../../Services/ToolsPDF//ExamDocument";
import ExamAnswerDocument from "../../Services/ToolsPDF/ExamAnswerDocument";
import api from "../../Services/api";
import  {Snackbar}  from '@mui/material';
import StatusModal from '../../Component/StatusModal';

const ExamPdf = ({ exercises }) => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [year, setYear] = useState("2024");
  const [level, setLevel] = useState("الاولى ابتدائي");
  const [matriel, setMatriel] = useState("اللغة العربية");
  const [trimester, setTrimester] = useState("الفصل الاول");

  const [error, setError] = useState(null);
  const [isErrorOpen, setIsErrorOpen] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handelSubmit =async(event)=>{
    event.preventDefault();
    try {
      await api.post('/api/user/current/archive');
      setSnackbarMessage('This Exam add to archive successfully.');
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error added to favorit service:", error);
      setError('Exercises has not delete from favorit');
      setIsErrorOpen(true);
    }
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
                  className="inline-flex items-center justify-center whitespace-nowrap rounded text-sm text-white font-medium ring-offset-background  bg-indigo-700 h-10"
                >
                  <PDFDownloadLink document={
                  <ExamDocument 
                  exam={exercises}  
                  year={year} 
                  level={level} 
                  material={matriel} 
                  trimester={trimester}/>} 
                  fileName="exam.pdf"
                  className="w-full">
                  {({ loading }) => (loading ? 'Loading document...' : 'Download Exam PDF')}
                  </PDFDownloadLink>
                </button>
                <button
                  className="inline-flex items-center justify-center whitespace-nowrap rounded text-sm text-white font-medium ring-offset-background  bg-indigo-700 h-10"
                >
                  <PDFDownloadLink document={
                  <ExamAnswerDocument 
                  exam={exercises}  
                  year={year} 
                  level={level} 
                  material={matriel}
                  trimester={trimester}/>} 
                  fileName="answer.pdf"
                  className="w-full">
                  {({ loading }) => (loading ? 'Loading document...' : 'Download Answer PDF')}
                  </PDFDownloadLink>
                </button>
              </form>
            </div>
          </div>
        </Modal>
      )}
      {error && (
        <StatusModal
          type="error"
          title="Error Occurred"
          message={error}
          isOpen={isErrorOpen}
          onClose={() => setIsErrorOpen(false)}
        />
      )}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}/>
    </div>
  );
};

export default ExamPdf;