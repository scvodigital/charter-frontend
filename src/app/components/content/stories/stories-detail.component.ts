import { Component, ElementRef } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { AppService } from '../../../services/app.service';

@Component({
    selector: 'main-container.content',
    templateUrl: './stories-detail.component.html'
})
export class StoriesDetailComponent {
    public organisation: string;
    public illustration: string;
    public pull_quote: string;
    public longer_text: string;

    constructor (router: Router) {
        router.events.forEach((event) => {
            if (event instanceof NavigationEnd) {
                if (event.url == '/stories/cre8te-opportunites') {
                    this.organisation = 'Cre8te Opportunities Limited';
                    this.illustration = 'WEB-Skill-Up-(Creating).png';
                    this.pull_quote = '“Giving people the skills they are expected to have automatically by the welfare system enables them to meet Jobcentre expectations & help avoid the possibility of sanctions, which are having a major impact on people living in poverty”';
                    this.longer_text = '<p><strong>Cre8te ran FEMDA, the ‘Female Ethnic Minority Digital Academy’, in conjunction with the charity Saheliya.</strong></p><p>They said:</p><p>“We recruited for our first group of learners by holding assessments to make sure the class was the right thing for them. They started their training in January. The women have varying levels of English which has meant that we have had to develop our existing learning materials so that they were suitable for ESOL learners. We have also developed additional learning material to meet their needs.</p><p>The learners are very motivated, coming in early to get extra practice and not stopping for a break. We recruited 6 learners initially with a further 4 in the process of recruitment at the moment. 3 learners have now passed their Microsoft Basic Digital Literacy certificates and are now ready to continue at a different class to improve their Microsoft Word skills.</p><p>The project has a significant impact on the women we support, giving them the skills to enable them to search for & obtain work, access public & consumer services, pay bills, search for cost savings for utilities & goods, have social contact with others & even keep up with their children’s activities online.</p><p>Giving people the skills they are expected to have automatically by the welfare system, enables them to meet Jobcentre expectations & help avoid the possibility of sanctions which are having a major impact on people living in poverty.”</p>';

                } else if (event.url == '/stories/glasgow-life') {
                    this.organisation = 'Glasgow Life';
                    this.illustration = 'WEB-Skill-Up-(Creating).png';
                    this.pull_quote = '“Our frontline staff have the skills and knowledge to weave relevant digital learning elements into the work they are already doing with harder to reach groups”';
                    this.longer_text = '<p><strong>Glasgow Life built basic digital skills for both workforce and service users, through a six month Digital Internship post. This meant hey could create created a mentored online learning resource for frontline staff working with client groups least likely to have basic digital skills and access.</strong></p><p>They said:</p><p>“Overall this project delivered a range of mentored digital CPD learning resource for a wide range of frontline staff (Youth, Community, Play workers, ESOL and ALN tutors). The content was based on the ’23 Things’ approach originally developed for Information Professionals and more recently adopted by the Scottish Government Library as a digital learning approach for civil servants.</p><p>In terms of outputs we have to date delivered training for 40 frontline workers. The training materials are currently being reviewed and expanded following feedback from the first tranche of trainees and will commence again in Autumn 2016 after a workforce rationalisation process has concluded.</p><p>We created an online (Moodle based – in partnership with Glasgow Kelvin College) learning resource which will continue to develop and expand.</p><p>In terms of outcomes for the people and groups we care about, this project has ensured that our frontline staff have the skills and knowledge to weave relevant digital learning elements into the work they are already doing with harder to reach groups – exposing these learners (often for the first time) to the advantages and learning resources available online.”</p>';

                } else if (event.url == '/stories/queens-cross') {
                    this.organisation = 'Queens Cross Housing Association';
                    this.illustration = 'WEB-Skill-Up-(Creating).png';
                    this.pull_quote = '“We worked to engage older people with the internet”';
                    this.longer_text = '<p><strong>Queens Cross Housing Association got older people engaged in learning how to use the internet through researching their local history</strong></p><p>They said:</p><p>“We worked to engage older people with the internet by harnessing their interest in social history and genealogy. We sought to create small groups of people with a shared interest in history and offer them basic computing skills classes as well as specific sessions based on online geneology research.</p><p>We created a blog and had some success at asking group members to contribute to posts about their research and experiences.</p><p>The tenants particularly enjoyed learning how to watch videos online and find old photographs of Glasgow using the Mitchell Library’s online resources. A small group of tenants managed to trace their family history back to the 1700s while a larger group explored their families’ more recent history.</p><p>We established six weekly sessions for our older tenants and supported a weekly youth club at Woodside Library with local history activities.”</p>';
                }
            }
        });
    }
}
