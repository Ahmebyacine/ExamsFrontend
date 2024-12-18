import { useState} from "react";
import jsPDF from "jspdf";
import {generatePdfWithArabic, calculateImageDimensions, addContentToPdf, addQuestionsToPdf, addImages, AddPageNumbers } from "../utils/pdfUtils";
import {Download } from 'lucide-react';
import { isRTL} from '../utils/detectArabic'; 
import Modal from "../UI/Modal";
import ArabicPDFGenerator from "../UI/ArabicPdfComponent";

const ExamPdf = ({ exercises }) => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [year, setYear] = useState("2024");
  const [level, setLevel] = useState("الاولى ابتدائي");
  const [matriel, setMatriel] = useState("اللغة العربية");
  const [trimester, setTrimester] = useState("الفصل الاول");

  const generatePdf = () => {
    const pdf = new jsPDF();
    const padding = 10;
    const pageWidth = pdf.internal.pageSize.width - padding * 2;
    const pageHeight = pdf.internal.pageSize.height - 10;
    let yPosition = 60;
    let exerciseNumber = 1;
    
    // Header Statict
    generatePdfWithArabic(pdf,year,level,matriel,trimester);
  
    exercises.forEach((exercise) => {
      if (yPosition > pageHeight) {
        pdf.addPage();
        yPosition = 20;
      }
      // Exercise number
      pdf.setFontSize(14);
      pdf.setFont("Helvetica", "bold");
      pdf.text(`Exercise ${exerciseNumber}`, padding, yPosition);
      yPosition += 10;
  
      exercise.exercise.forEach((contentItem) => {
        if (yPosition > pageHeight) {
          pdf.addPage();
          yPosition = 20;
        } 
        const textDirection = isRTL(contentItem.content) ? "rtl" : "ltr";
        const textAlign = textDirection === "rtl" ? "right" : "left";
         if (textDirection === "rtl") {
           pdf.setFont("Amiri",'normal');
         } else {
           pdf.setFont("Helvetica", "normal");
         }
        pdf.setFontSize(12);
        const xPosition = textAlign === "right" ? pageWidth - padding + 20: padding;
        if (["left", "right"].includes(contentItem.imagePosition)) {
          yPosition = handleSideImageLayout(pdf, contentItem, xPosition, pageWidth, yPosition, pageHeight,textAlign);
        } else {
          yPosition = handleTopBottomImageLayout(pdf, contentItem, xPosition, pageWidth, yPosition, pageHeight,textAlign);
        }
  
        yPosition += 10;
      });
      exerciseNumber++;
      // Check space after each exercise
      if (yPosition > pageHeight) {
        pdf.addPage();
        yPosition = 10;
      }
    });

    AddPageNumbers(pdf);
    const today = new Date();
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);
    pdf.save(`Exam_${formattedDate}.pdf`);
  };
  
  
  const handleSideImageLayout = (pdf, contentItem, padding, pageWidth, yPosition,pageHeight,textAlign) => {
    const targetWidth = 80;
    const { height: imageHeight } = calculateImageDimensions(contentItem.image, targetWidth);
    const textWidth = pageWidth - targetWidth - 10;
  
    if (contentItem.imagePosition === "left") {
      if (yPosition > pageHeight) {
        pdf.addPage();
        yPosition = 20;
      }
      // Draw image on the left
      pdf.addImage(contentItem.image, "JPEG", padding, yPosition, targetWidth, imageHeight,pageHeight);
      const textX = padding + targetWidth + 10;
      yPosition += addContentToPdf(pdf, contentItem.content, textX, yPosition, textWidth,pageHeight,textAlign);
      yPosition += addQuestionsToPdf(pdf, contentItem.questions, textX, yPosition, textWidth,pageHeight,textAlign);
    } else {
      // Draw text first, then image on the right
      yPosition += addContentToPdf(pdf, contentItem.content, padding, yPosition, textWidth,pageHeight,textAlign);
      yPosition += addQuestionsToPdf(pdf, contentItem.questions, padding, yPosition, textWidth,pageHeight,textAlign);
      if (yPosition > pageHeight) {
        pdf.addPage();
        yPosition = 20;
      }
      pdf.addImages(
        contentItem.image,
        "JPEG",
        padding + textWidth + 10,
        yPosition - imageHeight,
        targetWidth,
        imageHeight,
        pageHeight
      );
    }
  
    return yPosition + imageHeight + 10; // Return updated yPosition
  };
  
  const handleTopBottomImageLayout = (pdf, contentItem, padding, pageWidth, yPosition,pageHeight,textAlign) => {
    let contentWidth = pageWidth;
    if (contentItem.image && contentItem.secondImage){
      contentWidth = 0.9 * pageWidth;
    }else{
      contentWidth = 0.65 * pageWidth;
    }
    const xOffset = (pageWidth - contentWidth + 20) / 2;
  
    if (contentItem.imagePosition === "top") {
      if (yPosition > pageHeight) {
        pdf.addPage();
        yPosition = 20;
      }
      yPosition = addImages(pdf, contentItem, xOffset, yPosition, contentWidth, pageHeight);
    }
    yPosition += addContentToPdf(pdf, contentItem.content, padding, yPosition, pageWidth,pageHeight,textAlign);
    yPosition += addQuestionsToPdf(pdf, contentItem.questions, padding, yPosition, pageWidth,pageHeight,textAlign);
  
    if (contentItem.imagePosition === "bottom") {
      if (yPosition > pageHeight) {
        pdf.addPage();
        yPosition = 20;
      }
      yPosition = addImages(pdf, contentItem, xOffset, yPosition, contentWidth, pageHeight);
    }
  
    return yPosition;
  };
  const handelSubmit =(event)=>{
    event.preventDefault();
    generatePdf();
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
      <ArabicPDFGenerator/>
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
                  Download Exam
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