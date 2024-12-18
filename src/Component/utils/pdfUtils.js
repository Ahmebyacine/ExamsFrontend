import {AmiriFont} from '../../Data/AmiriFont'



export const generatePdfWithArabic = (pdf,year,level,matriel,trimester) => {

  // Add the font to jsPDF
  pdf.addFileToVFS('Amiri-Regular.ttf', AmiriFont);
  pdf.addFont('Amiri-Regular.ttf', 'Amiri', 'normal');
  pdf.setFont('Amiri');
  pdf.setFontSize(12);
  const pageWidth = pdf.internal.pageSize.width;
  pdf.setLineWidth(0.3);

  // Add text with RTL alignment
  pdf.text("الجمهورية الجزائرية الديمقراطية الشعبية", pageWidth / 2, 10, { align: "center", lang: "ar" });
  pdf.text("وزارة التربية الوطنية", pageWidth / 2, 20, { align: "center", lang: "ar" });
  pdf.line(10, 24, pageWidth - 10, 24);
  pdf.text(`امتحان ${trimester}`, pageWidth - 15, 30, { align: "right", lang: "ar" });
  pdf.text(`السنة الدراسية:${year}`,15, 30, {align:"left", lang: "ar" });
  pdf.text(`المستوى:${level}`, pageWidth - 15, 40, { align: "right", lang: "ar" });
  pdf.text("المدة: 02 سا و 30 د", 15, 40, { align: "left", lang: "ar" });
  pdf.line(10, 44, pageWidth - 10, 44);
  pdf.text(`اختبار في مادة:${matriel}`, pageWidth / 2, 50, { align: "center", lang: "ar" });

  };
export const calculateImageDimensions = (imageSrc, targetWidth) => {
  const img = new Image();
  img.src = imageSrc;
  const aspectRatio = img.height / img.width;
  const width = targetWidth;
  const height = width * aspectRatio;
  return { width, height };
};

export const addContentToPdf = (pdf, content, x, y, width, pageHeight,textAlign) => {
  const lineHeight = 6;
  const contentLines = pdf.splitTextToSize(content, width);
  let yPosition = y;

  contentLines.forEach((line) => {
    if (yPosition + lineHeight > pageHeight) {
      pdf.addPage();
      yPosition = 20;
    }
    pdf.text(line, x, yPosition,{
      align: textAlign,
      lang: textAlign === "right" ? "ar" : "en",
    });
    yPosition += lineHeight;
  });

  return yPosition - y;
};


export const addQuestionsToPdf = (pdf, questions, x, y, width, pageHeight,textAlign) => {
  let yPosition = y; 
  const lineHeight = 6;
  
  questions.forEach((q, index) => {
    // if condition if aranic write
    if (textAlign === "right"){
      pdf.setR2L(true);
      pdf.text(`.${index + 1}`, x, yPosition,{
        align: textAlign,
        lang: textAlign === "right" ? "ar" : "en",
      });
    
 
    const questionLines = pdf.splitTextToSize(q.question, width);
      let isFirstLine = true; 
      questionLines.forEach((line) => {
        if (yPosition  > pageHeight) {
          pdf.addPage();
          yPosition = 20;
        }
        const Text = pdf.processArabic(line);
        // Adjust x position for subsequent lines
        const currentX = isFirstLine ? x - 5: x;
        
        pdf.text(Text, currentX, yPosition, {
            align: 'right', // Align text to the right
            lang: 'ar',     // Specify Arabic language
          });
        pdf.setR2L(false);
        
        yPosition += lineHeight;
        isFirstLine = false;
      });
      

    }
    else{
      // if latino methode
      const questionText = `${index + 1}. ${q.question}`;
      const questionLines = pdf.splitTextToSize(questionText, width);
      questionLines.forEach((line) => {
        if (yPosition + lineHeight > pageHeight) {
          pdf.addPage();
          yPosition = 20; 
        }
        pdf.text(line, x, yPosition,{
          align: textAlign,
          lang: textAlign === "right" ? "ar" : "en",
        });
        yPosition += lineHeight;
      });
    }

    
  });

  return yPosition - y;
};

export const addImages = (pdf, contentItem, xOffset, yPosition, contentWidth, pageHeight) => {
  const padding = 10; 

  if (contentItem.image && contentItem.secondImage) {
    // Two side-by-side images
    const imageWidth = contentWidth * 0.5;
    const { height: imageHeight } = calculateImageDimensions(contentItem.image, imageWidth);
    const { height: secondImageHeight } = calculateImageDimensions(contentItem.secondImage, imageWidth);
    const maxImageHeight = Math.max(imageHeight, secondImageHeight);

    // Check if the images fit on the current page
    if (yPosition + maxImageHeight > pageHeight) {
      pdf.addPage();
      yPosition = 20;
    }

    // Add the images
    pdf.addImage(contentItem.image, "JPEG", xOffset, yPosition, imageWidth, imageHeight);
    pdf.addImage(
      contentItem.secondImage,
      "JPEG",
      xOffset + imageWidth + 5,
      yPosition,
      imageWidth,
      secondImageHeight
    );

    return yPosition + maxImageHeight + padding;
  } else if (contentItem.image || contentItem.secondImage) {
    // Single image
    const image = contentItem.image || contentItem.secondImage;
    const { height: imageHeight } = calculateImageDimensions(image, contentWidth);

    // Check if the image fits on the current page
    if (yPosition + imageHeight > pageHeight) {
      pdf.addPage();
      yPosition = 20;
    }

    // Add the image
    pdf.addImage(image, "JPEG", xOffset, yPosition, contentWidth, imageHeight);

    return yPosition + imageHeight + padding;
  }

  return yPosition;  
};
export const AddPageNumbers =(pdf)=>{
  const pageCount = pdf.getNumberOfPages();

    // Add page numbers
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      pdf.setFontSize(10);
      pdf.text(`${i}/${pageCount}`, pdf.internal.pageSize.width / 2, pdf.internal.pageSize.height - 10, {
        align: "center",
      });
    }
    //border pages
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      pdf.rect(5, 5, pdf.internal.pageSize.width - 10, pdf.internal.pageSize.height - 10);
    }
}