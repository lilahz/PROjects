import React from 'react';
import { MDBRow } from "mdbreact";
import JuniorComponent from './JuniorComponent';
import classes from '../ItemsComponent.module.css';

export default function JuniorsComponent(props) {
    return <div className={classes.AllItems}>
        <MDBRow >
            {props.juniors.map((junior) => (
                <JuniorComponent key={junior.id} className="col-sm-4"
                    cardTitle={junior.full_name} 
                    cardText={junior.about_me} 
                    cardField={junior.field}
                    cardImage={junior.profile_picture}
                    cardEmail={junior.email}
                    cardPersonalURL={junior.personal_url}
                    cardFacebookURL={junior.facebook_url}
                    cardInstagramURL={junior.instagram_url}
                    cardLinkedInURL={junior.linkedIn_url}
                    cardGitHubURL={junior.gitHub_url}
                    />))}
        </MDBRow>
    </div>
}