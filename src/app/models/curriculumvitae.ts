

export interface Telephone{
    type: string;
    number: string;
}

export interface Messiging{
    provider: string;
    username: string;
}

export interface WorkExperince{
    from: Date;
    to: Date;
    ongoing: boolean;
    position: string;
    employer: string;
    city: string;
    country: string;
    mainActivities: string;
}

export interface Education {
    from: Date;
    to: Date;
    ongoing: boolean;
    title: string;
    organisation: string;
    city: string;
    country: string;

}

export interface CurriculumVitae {
    firstName: string;
    surname: string;
    address: string;
    postalCode: string;
    city: string;
    country: string;

    telephones: Array<Telephone>;

    email: string;
    websites: Array<string>;

    messiging: Array<Messiging>;

    type: string;
    description: string;

    workExperinence: Array<WorkExperince>;
    educations: Array<Education>;

    motherTongue: string;
    foreignLanguage: string;
    relatedSkills: string;
}
