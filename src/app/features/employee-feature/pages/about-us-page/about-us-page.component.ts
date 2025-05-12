import { Component, OnInit } from '@angular/core';

export interface Testimonial{
  name: string,
  position: string,
  feedback: string,
  image: string
}

@Component({
  selector: 'app-about-us-page',
  templateUrl: './about-us-page.component.html',
  styleUrls: ['./about-us-page.component.scss']
})
export class AboutUsPageComponent implements OnInit {
  testimonial = <Testimonial[]>[];
  
  constructor() { }

  ngOnInit() {
   this.initTestimonials();
  }

  initTestimonials(){
    this.testimonial = [
      {
        name: 'Alex Johnson',
        position: 'Founder of Tech Innovations',
        image: 'assets/images/testimonial-1.jpg',
        feedback: 'Working with Digencia has been an incredible experience. The team is not only skilled but also genuinely cares about our success. Their creative solutions have transformed our business, and the results speak for themselves.'
      },
      {
        name: 'Emily Davis',
        position: 'Marketing Manager at GreenCo',
        image: 'assets/images/testimonial-2.jpg',
        feedback: 'From day one, Digencia understood our vision and delivered a product that exceeded our expectations. Their attention to detail and commitment to excellence have made a lasting impact on our business.'
      },
      {
        name: 'Samantha Moore',
        position: 'CEO of Urban Design Studio',
        image: 'assets/images/testimonial-3.jpg',
        feedback: 'We’ve seen substantial growth since partnering with Digencia. Their strategic approach to digital marketing has helped us reach new customers, and their customer service is outstanding. Highly recommend!'
      }
    ]
  }
}
