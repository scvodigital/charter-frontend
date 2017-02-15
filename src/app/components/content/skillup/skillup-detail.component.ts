import { Component, ElementRef } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { AppService } from '../../../services/app.service';

@Component({
    selector: 'main-container.content',
    templateUrl: './skillup-detail.component.html'
})
export class SkillUpDetailComponent {
    public number: number;
    public title: string;
    public illustration: string;
    public content_organisations: string;
    public content_individuals: string;
    public content_safety: string;

    constructor (router: Router) {
        router.events.forEach((event) => {
            if (event instanceof NavigationEnd) {
                if (event.url == '/skill-up/managing-information') {
                    this.number = 1;
                    this.title = 'Managing Information';
                    this.illustration = 'WEB-Skill-Up-(Managing-Info).png';
                    this.content_organisations = '<ul><li>Store digital information on suppliers and customers</li><li>Search for new suppliers to find the best deals</li><li>Understand who uses your website</li><li>Discover potential growth opportunities for your organisation</li></ul>';
                    this.content_individuals = '<ul><li>Use a search engine to find the information you need</li><li>Search for deals on comparison websites</li><li>Bookmark useful websites and services</li><li>Store data on a device or in the cloud</li></ul>';
                    this.content_safety = '<ul><li>Assess the accuracy of sources of information</li><li>Use security tools when browsing</li><li>Regularly update and run virus-checking software</li><li>Manage parental controls</li></ul>';

                } else if (event.url == '/skill-up/communicating') {
                    this.number = 2;
                    this.title = 'Communicating';
                    this.illustration = 'WEB-Skill-Up-(Communicating).png';
                    this.content_organisations = '<ul><li>Maintain customer and client relationships</li><li>Use social media to promote your organisation and connect with new customers and service users</li><li>Improve your customer service by providing accessible information and answers to frequently asked questions</li></ul>';
                    this.content_individuals = '<ul><li>Keep in touch using email, instant messaging, video calls and social media</li><li>Post on forums to connect with communities</li><li>Communicate with organisations about their products and services</li></ul>';
                    this.content_safety = '<ul><li>Understand how to protect your identities</li><li>Protect yourself from scams</li><li>Use the right security settings (including parental controls)</li><li>Protect your customer data</li></ul>';

                } else if (event.url == '/skill-up/transacting') {
                    this.number = 3;
                    this.title = 'Transacting';
                    this.illustration = 'WEB-Skill-Up-(Transacting).png';
                    this.content_organisations = '<ul><li>Maximise your potential through a website</li><li>Save time by applying for government business permits and licenses</li><li>Manage invoices and accounts</li><li>Receive payments or donations</li><li>Protect yourself from fraud or scams</li></ul>';
                    this.content_individuals = '<ul><li>Understand and use marketplaces to buy and sell</li><li>Order your shopping</li><li>Book your travel</li><li>Manage your bank account</li><li>Set up and manage a Universal Credit account</li></ul>';
                    this.content_safety = '<ul><li>Use secure websites for financial transactions</li><li>Protect your personal data</li><li>Respect the privacy of others</li></ul>';

                } else if (event.url == '/skill-up/problem-solving') {
                    this.number = 4;
                    this.title = 'Problem Solving';
                    this.illustration = 'WEB-Skill-Up-(Problem-Solving).png';
                    this.content_organisations = '<ul><li>Save on business travel and be more efficient by using video conferencing</li><li>Quickly understand which products and services work based on online feedback</li><li>Interpret simple analytics to improve website performance</li><li>Get solutions to problems from safe, accurate sources</li></ul>';
                    this.content_individuals = '<ul><li>Teach yourself simple tasks using tutorials</li><li>Use feedback from other internet users to solve common problems</li><li>Access support services</li></ul>';
                    this.content_safety = '<ul><li>Use accurate sources of support</li><li>Avoid malicious websites, scams and pop-up windows</li></ul>';

                } else if (event.url == '/skill-up/creating') {
                    this.number = 5;
                    this.title = 'Creating';
                    this.illustration = 'WEB-Skill-Up-(Creating).png';
                    this.content_organisations = '<ul><li>Create an infomercial or e-commerce website</li><li>Create content (pictures, logos, text) to promote your organisation and reach customers and service users</li><li>Use social media and create communities to engage with customers and service users</li><li>Create resources to improve employee skill levels</li></ul>';
                    this.content_individuals = '<ul><li>Create a social media post</li><li>Create a text document such as a CV</li><li>Create and share a photo album</li><li>Create and share feedback about products and services</li></ul>';
                    this.content_safety = '<ul><li>Be aware of copyright law</li><li>Protect your personal data</li><li>Respect the privacy of others</li></ul>';
                }
            }
        });
    }
}
