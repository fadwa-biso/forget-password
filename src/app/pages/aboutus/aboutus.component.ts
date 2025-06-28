import { Component } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  standalone: false,
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.css',
})
export class AboutusComponent {
  teamMembers = [
    {
      name: 'Omar Sallam',
      role: 'Team Lead & Full Stack developer',
      bio: `Egyptian developer with 4+ years’ experience.
Skilled in C#, ASP.NET MVC, Angular, and EF.
Built ERP systems with inventory and sales modules.
Creates clean UIs with Bootstrap and Tailwind CSS.
`,
      image: 'assets/images/creators/omar.jpg',
    },
    {
      name: 'Mahmoud Magdy',
      role: 'Full Stack developer',
      bio: `Web developer skilled in Node.js, Express, MongoDB, Angular, and React. Focused on scalable apps using REST APIs, JWT auth, and responsive UIs with Bootstrap and custom hooks.`,
      image: 'assets/images/creators/mahmoud.jpeg',
    },
    {
      name: 'Alaa Kamal',
      role: 'Front-end developer',
      bio: 'Alaa focuses on crafting modern web experiences using frontend technologies, with a love for continuous learning',
      image: 'assets/images/creators/alaa.jpeg',
    },
    {
      name: 'Fadwa Bassiony',
      role: 'Front-end developer',
      bio: 'Fadwa combines a love for design with strong front-end skills to build elegant, user-focused web interfaces using CSS and JavaScript.',
      image: 'assets/images/creators/fadwa.jpeg',
    },
    {
      name: 'Nada Esmail',
      role: 'Front-end developer',
      bio: 'Front-end developer focused on building clean, responsive interfaces using Angular, React, Bootstrap, and Tailwind CSS. Passionate about user experience, performance.',
      image: 'assets/images/creators/nada.jpeg'
    }

  ];
}
