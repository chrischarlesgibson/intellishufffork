import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { jsPDF } from "jspdf";
import { HelperService } from 'src/app/universal/helper.service';
import { gsap } from 'gsap';
  
      // in tsconfig set "allowSyntheticDefaultImports": true,

// import introJs from 'intro.js';
import introJs from 'intro.js';
import { IUser, UserRole } from '../authentication/user.model';
import { AuthService } from '../authentication/auth.service';
import { UserSettingService } from '../user-setting.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('modal') modal: ElementRef;
  @ViewChild('routerOutlet', { static: true }) routerOutlet: RouterOutlet;

  formGroup: FormGroup;
  currentUser: IUser;
  userRole = UserRole;

  constructor(private formBuilder: FormBuilder
    , private router: Router
    , private userSettingSvc: UserSettingService
    , private helperSvc: HelperService
    , private authSvc: AuthService
    , private elementRef: ElementRef
    , private renderer: Renderer2
     ) {
  }

  async ngOnInit() {
    await this._getCurrentUser();
    if (!this.currentUser?.tourVisited) {
      // this.startTour();
    }
    // Slide In animation
    // gsap.from(".card", { x: -100, duration: 1 });
    gsap.from(".card", { opacity: 0, stagger: 0.2, duration: 1 });

    // Scroll-based Animation
    // gsap.from(".card", { opacity: 0, y: 100, scrollTrigger: ".card", duration: 1 });

  }



  animateOnHover(card: HTMLElement) {
    this.renderer.setStyle(card, 'cursor', 'pointer');
    gsap.to(card, { scale: 1.2, duration: 0.3 });
  }

  resetAnimation(card: HTMLElement) {
    this.renderer.removeStyle(card, 'cursor');
    gsap.to(card, { scale: 1, duration: 0.3 });
  }


  onCardClicked(path: string) {
    this.router.navigate([path] )
  }

  private async _getCurrentUser() {
    const currentUser: any = await this.userSettingSvc.getCurrentUser();
    
    if (currentUser !== null) {
      this.currentUser = currentUser;
    } else {
      this.currentUser = null!;
    }
  }
  
  // startTour() {
  //   const intro = introJs();
  //   intro.setOptions({
  //     // showProgress: true,
  //     steps: [
  //       {
  //         element: '#question',
  //         intro: 'Add mcq question',
  //       },
  //       {
  //         element: '#options',
  //         intro: 'Add options for mcq',
  //       },
  //       {
  //         element: '#addBtn',
  //         intro: 'Click on Add button',
  //       },
  //       {
  //         element: document.querySelector('.card') as HTMLElement,
  //         intro: 'MCQ Added',
  //       },
  //       {
  //         element: '#versions',
  //         intro: 'Enter number of versions you want to generate',
  //       },
  //       {
  //         element: '#generate',
  //         intro: 'Click on generate',
  //       },
  //       {
  //         element: '#courseName',
  //         intro: 'Enter course name',
  //       },
  //       {
  //         element: '#export',
  //         intro: 'Click to export pdf of shuffled mcqs',
  //       },
  //       {
  //         intro: 'Great! Your are done.',
  //       },
  //       // Add more steps as needed
  //     ],
  //     exitOnOverlayClick: false,
  //     // Add event listener for when the tour is completed
      
  //   });
  //   // intro.onafterchange(() => {
  //   //   // Check if the dynamically created element exists
  //   //   const dynamicElement = document.querySelector('.card') as HTMLElement;
  //   //   if (dynamicElement) {
  //   //     const dynamicStep = {
  //   //       element: document.querySelector('.card') as HTMLElement,
  //   //       intro: 'This is the dynamically created element',
  //   //     };
  //   //     intro.addStep(dynamicStep); // Add the dynamic step to the steps array
  //   //     // intro.setOptions({ steps: steps }); // Update the steps in the intro tour
  //   //     intro.refresh(); // Refresh the intro tour with the updated steps
  //   //     intro.goToStep(intro.currentStep.length - 1); // Go to the newly added dynamic step
  //   //   }
  //   // });


  //   intro.oncomplete(() =>  {
  //     this.currentUser.tourVisited = true;
  //      this.authSvc.updateTourStatus(this.currentUser )
  //   });
    
  //   intro.onexit( () => {
  //     this.currentUser.tourVisited = true;
  //     this.authSvc.updateTourStatus(this.currentUser ) 
  //   });

  //   intro.start();

  // }

  // for images
  
  // private async _exportPdf() {
  //   return new Promise<void>((resolve) => {
  //     const doc = new jsPDF({
  //       orientation: "portrait",
  //       unit: "pt",
  //       format: "letter",
  //     });
  
  //     const margin = 30;
  //     const pageWidth = doc.internal.pageSize.width - 2 * margin;
  //     const pageHeight = doc.internal.pageSize.height - 2 * margin;
  //     const imageWidth = 100; // Adjust the width of the image as per your requirement
  //     const imageHeight = 50; // Adjust the height of the image as per your requirement
  //     let currentPage = 1;
  //     let yPos = margin;
  //     const studentId = "__________"; // Static student ID
  //     const courseName = "English Literature"; // Static course name
  //     const institutionName = "ABC University"; // Static institution name
  
  //     this.shuffled.forEach((m, index) => {
  //       // Check if it is the beginning of a new set
  //       const isBeginningOfSet = index % this.questionsCount === 0;
  //       if (isBeginningOfSet) {
  //         doc.addPage();
  //         currentPage++;
  //         yPos = margin;
  
  //         doc.setFontSize(10);
  //         doc.setFont("normal");
  //         doc.text(`Student ID: ${studentId}`, pageWidth - margin, yPos, {
  //           align: "right",
  //         });
  //         yPos += 20;
  //         doc.text(`Course: ${courseName}`, pageWidth - margin, yPos, {
  //           align: "right",
  //         });
  //         yPos += 20;
  //         doc.text(`Institution: ${institutionName}`, pageWidth - margin, yPos, {
  //           align: "right",
  //         });
  //         yPos += 30;
  //       }
  
  //       let question = null;
  //       if ((index + 1) % this.questionsCount > 0) {
  //         question =
  //           index + 1 > this.questionsCount
  //             ? `${(index + 1) % this.questionsCount}: ${m.q}`
  //             : `${index + 1}: ${m.q}`;
  //       } else {
  //         question = `${this.questionsCount}: ${m.q}`;
  //       }
  
  //       const options = [
  //         { key: "a", text: m.a, image: "path/to/image1.jpg" },
  //         { key: "b", text: m.b, image: "path/to/image2.jpg" },
  //         { key: "c", text: m.c, image: "path/to/image3.jpg" },
  //         { key: "d", text: m.d, image: "path/to/image4.jpg" },
  //       ];
  
  //       doc.setFontSize(12);
  //       doc.setFont("bold");
  //       const questionLines = doc.splitTextToSize(question, pageWidth);
  //       const questionHeight = questionLines.length * 20;
  
  //       if (yPos + questionHeight + options.length * 20 > pageHeight) {
  //         doc.addPage();
  //         currentPage++;
  //         yPos = margin;
  //       }
  
  //       doc.text(questionLines, margin, yPos);
  //       yPos += questionHeight;
  
  //       doc.setFontSize(10);
  //       doc.setFont("normal");
  //       const optionMaxWidth = pageWidth - 2 * margin;
  //       const optionMarginLeft = 10;
  
  //       options.forEach((option) => {
  //         const optionText = `${option.key}. ${option.text}`;
  //         const optionLines = doc.splitTextToSize(optionText, optionMaxWidth);
  //         doc.text(optionLines, margin + optionMarginLeft, yPos);
  
  //         if (option.image) {
  //           fetch(option.image)
  //             .then((response) => response.blob())
  //             .then((blob) => {
  //               const reader = new FileReader();
  //               reader.onloadend = () => {
  //                 const base64Data = reader.result;
  //                 doc.addImage(
  //                   base64Data as string,
  //                   "JPEG",
  //                   margin,
  //                   yPos + 5,
  //                   imageWidth,
  //                   imageHeight
  //                 );
  //                 yPos += 20 * optionLines.length;
  //               };
  //               reader.readAsDataURL(blob);
  //             })
  //             .catch((error) => {
  //               console.error("Image loading error:", error);
  //             });
  //         } else {
  //           yPos += 20 * optionLines.length;
  //         }
  //       });
  
  //       yPos += 10;
  
  //       if (yPos + 60 > pageHeight) {
  //         doc.addPage();
  //         currentPage++;
  //         yPos = margin;
  //       }
  //     });
  
  //     doc.save("mcqs.pdf");
  //     resolve();
  //   });
  // }
  

  
  // startTour() {
  //   const intro = introJs();
  //   intro.setOptions({
  //     steps: [
  //       {
  //         element: '#question',
  //         intro: 'Add mcq question',
  //       },
  //       {
  //         element: '#options',
  //         intro: 'Add options for mcq',
  //       },
  //       {
  //         element: '#addBtn',
  //         intro: 'Click on Add button',
  //       },
  //       {
  //         element: '#mcq',
  //         intro: 'MCQ Added',
  //       },
  //       {
  //         element: '#versions',
  //         intro: 'Enter number of versions you want to generate',
  //       },
  //       {
  //         element: '#generate',
  //         intro: 'Click on generate',
  //       },
  //       {
  //         element: '#courseName',
  //         intro: 'Enter course name',
  //       },
  //       {
  //         element: '#export',
  //         intro: 'Click to export pdf of shuffled mcqs',
  //       },
  //       {
  //         intro: 'Great! You are done.',
  //       },
  //     ],
  //     exitOnOverlayClick: false,
  //   });
  
  //   intro.start();
  
  //   intro.onafterchange((targetElement) => {
  //     const currentStep = intro.currentStep(); // Get the current step index
  //     const elementId = targetElement.getAttribute('id'); // Get the ID of the target element
  
  //  // Find the corresponding step index for the element ID
  //     if (elementId) {
  //       const targetElement = document.querySelector(elementId);
  //       intro.goToStep(intro.currentStep + 1);
  //     }
  //   });
  
  //   intro.oncomplete(() => {
  //     this.tourCompleted = true;
  //     localStorage.setItem('tourCompleted', 'true');
  //   });
  
  //   intro.onexit(() => {
  //     localStorage.setItem('tourCompleted', 'true');
  //   });
  // }
  

  // exitTour() {
  //   if (this.introJS) {
  //     this.introJS.exit();
  //   }
  // }
  
}


