import { Component } from '@angular/core';

@Component({
  selector: 'app-contactus',
  standalone: false,
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css'
})
export class ContactusComponent {
 formData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    newsletter: false
  };

  isSubmitting = false;
  showSuccessMessage = false;

  businessHours = [
    { day: 'Monday', time: '9:00 AM - 6:00 PM' },
    { day: 'Tuesday', time: '9:00 AM - 6:00 PM' },
    { day: 'Wednesday', time: '9:00 AM - 6:00 PM' },
    { day: 'Thursday', time: '9:00 AM - 6:00 PM' },
    { day: 'Friday', time: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', time: '9:00 AM - 6:00 PM' },
    { day: 'Sunday', time: '11:00 AM - 4:00 PM' }
  ];

  faqs = [
    {
      question: 'Do you offer authentication certificates?',
      answer: 'Yes, all our Victorian pieces come with detailed certificates of authenticity and provenance documentation.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for all items. Pieces must be returned in original condition with original packaging.'
    },
    {
      question: 'Do you provide delivery and setup?',
      answer: 'Yes, we offer white-glove delivery service including professional setup and placement in your home.'
    },
    {
      question: 'Can you help with interior design?',
      answer: 'Our team includes interior design consultants who can help you create the perfect Victorian-inspired space.'
    },
    {
      question: 'Do you accept custom restoration projects?',
      answer: 'Yes, we accept custom restoration projects for Victorian furniture. Contact us for a consultation and quote.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, bank transfers, and offer financing options for purchases over £1,000.'
    }
  ];

  onSubmit() {
    if (this.isSubmitting) return;

    this.isSubmitting = true;

    // Simulate form submission
    setTimeout(() => {
      this.isSubmitting = false;
      this.showSuccessMessage = true;

      // Reset form
      this.formData = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        newsletter: false
      };

      // Hide success message after 5 seconds
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 5000);
    }, 2000);
  }

}
