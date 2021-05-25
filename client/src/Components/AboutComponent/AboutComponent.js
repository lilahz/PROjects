import React from 'react';
import {Row} from 'react-bootstrap';

import classes from './AboutComponent.module.css';
import TeamComponent from './TeamComponent';

import leftImage from './images/TEAM.png';
import picAyelet from './images/ayelet.jpg';
import picOron from './images/oron.jpeg';
import picLilah from './images/lilach.jpeg';

const AboutComponent = () => {
        const RowStyle = {
            marginLeft: "5%",
            marginRight: "5%",
        }
        
    return (
        <div>
            <div className={classes.AboutTop}>
                <div className={classes.AboutHeaderRight}>
                    <h1 dir="rtl">מי אנחנו</h1>
                    <div className={classes.AboutHeaderUnderline}></div>
                </div> 
                <img src={leftImage} className={classes.AboutLeftImage} alt=""/> 
                <p className={classes.AboutPar} dir="rtl">
                    אנחנו איילת, לילך ואורון, סטודנטים שנה שלישית למדעי המחשב באוניברסיטת בן גוריון שבנגב,<br></br> 
                    מבקשים לפתח מיזם חברתי - עסקי שעונה על פער קריטי בתחום תעסוקת בוגרי אקדמיה צעירים.<br></br>
                    הרעיון בתמצית, הינו יצירת פלטפורמה המחברת בין הצעירים לבין עסקים או ארגונים ומאפשרת לצעירים <br></br>
                    לרכוש נסיון תעסוקתי בתחום התמחותם ובה בעת לייצר ערך וכח עבודה עדכני ואיכותי לעסקים באותו התחום.
                </p>              
            </div>
            <div className={classes.AboutBottom}>
                <Row>
                    <TeamComponent className="col-sm-4"
                                cardImage={picOron}
                                cardTitle="אורון לאופמן" 
                                cardText="סטודנט באוניברסיטת בן גוריון, עובד במייקרוסופט"
                                cardEmail="oronln1@gmail.com"
                                cardFB="https://www.facebook.com/oron.laufman"
                                cardLD="https://www.linkedin.com/in/oronlaufman/" />
                    <TeamComponent className="col-sm-4"
                                cardImage={picLilah}
                                cardTitle="לילך זיטניצקי" 
                                cardText="סטודנט באוניברסיטת בן גוריון, עובדת בג'נרל מוטרס"
                                cardEmail="lilahz05@gmail.com"
                                cardFB="https://www.facebook.com/lilahz"
                                cardLD="https://www.linkedin.com/in/lilah-zitnitzky/" />
                    <TeamComponent className="col-sm-4"
                                cardImage={picAyelet}
                                cardTitle="איילת בירן" 
                                cardText="סטודנט באוניברסיטת בן גוריון, עובת בפלייטיקה"
                                cardEmail="ayeletbiran3@gmail.com"
                                cardFB="https://www.facebook.com/ayelet.biran"
                                cardLD="https://www.linkedin.com/in/ayelet-biran-46b4ab147/" />
                </Row>
            </div>
        </div>
    )
}

export default AboutComponent;