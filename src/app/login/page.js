

import FireBaseAuth from '../components/fireAuth/fireBaseAuth'
import Layout from '../components/layout/Layout'
import LoginForm from '../components/loginForm/LoginForm'
import "./style.css"
export default function Login() {
  return (
    <Layout bennerTittle="Login here">
     {/* <FireBaseAuth/> */}
     <div className="bg-[#eaeaea] pb-28">
        <div className="container mx-auto">
          <div className="max-w-[700px] mx-auto bg-[#ffff]">
            <div className="registerHead">
              <p className="bg-[rgba(0,0,0,.45)] px-[15px] py-[5px] uppercase text-[16px] leading-[26px] text-[#fff] absolute bottom-10 left-[50px] font-[500]">
                {" "}
                Login
              </p>
            </div>
            <LoginForm/>
          </div>
        </div>
      </div>
    </Layout>
  )
}
