import { SignIn } from '@clerk/clerk-react'
import './SigninPage.css'

const SigninPage = () =>{
    return (
        <div className='signinpage'><SignIn path="/sign-in" signUpUrl='/sign-up' forceRedirectUrl="/dashboard" /></div>
    )
}

export default SigninPage