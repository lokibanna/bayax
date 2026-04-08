import { atom } from 'recoil'

// for profile view thing in navbar 
export const userProfileState = atom({
    key: 'userProfile',
    default: false
})

// username thing i dont remember where i used it 
export const usernameState = atom({
    key: 'username',
    default: ''
})

// store details while signed up 
export const usersignupState = atom({
    key: 'userState',
    default: {
        email: '',
        username: '',
        password: ''
    }
})


// to store details while user login 
export const userLoginState = atom({
    key: 'logInstate',
    default: {
        email: '',
        password: ''
    }
})

// to display auth message in login or signup pages 
export const authMessageState = atom({
    key: 'authMessageState',
    default: false
})

// for the profile button ig 
export const profileButton = atom({
    key: 'profileButton',
    default: false
})

// for protected route 
export const protectedRoutesState = atom({
    key: 'protectedRoutesState',
    default: !!localStorage.getItem('username'), // initialize based on username presence in localStorage
});

export const lessonPlanForm = atom({
    key: 'lessonPlanValue',
    default: {
        subject: '',
        topic: '',
        grade: '',
        duration: ''
    }
})

// EXPANDED: Idea Wizard State
export const ideaFormState = atom({
    key: 'ideaFormState',
    default: {
        step: 1, // 1=Field, 2=Intent, 3=Details
        field: '', // 'Business', 'Tech', 'Medical', etc.
        intent: '', // 'have_idea', 'need_idea', 'validate_idea'
        content: '', // The user's description
        techStack: '', // Optional preference e.g. 'MERN', 'No-Code'
    }
})