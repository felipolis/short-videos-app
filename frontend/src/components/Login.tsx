import React from "react"
import { LOGIN_USER } from "../graphql/mutations/login"
import { useMutation } from "@apollo/client"
import { GraphQLErrorExtensions } from "graphql"
import { useUserStore } from "../stores/userStore"
import useGeneralStore from "../stores/generalStore"
import Input from "./Input"
function Login() {
  
  const setUser = useUserStore((state) => state.setUser)
  const setLoginIsOpen = useGeneralStore((state) => state.setLoginIsOpen)
  const [loginUser, { loading, error, data }] = useMutation(LOGIN_USER)
  const [errors, setErrors] = React.useState<GraphQLErrorExtensions>({})
  const [invalidCredentials, setInvalidCredentials] = React.useState(false)

  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
  })

  const handleLogin = async () => {
    setErrors({})
    try {
      const response = await loginUser({
        variables: {
          email: loginData.email,
          password: loginData.password,
        },
      })

      response && response.data && setUser(response.data.login.user)
      setLoginIsOpen(false)
    } catch (_) {
      if (error && error.graphQLErrors[0].extensions?.invalidCredentials) {
        setInvalidCredentials(
          error.graphQLErrors[0].extensions?.invalidCredentials
        )
      } else if (error) {
        setErrors(error.graphQLErrors[0].extensions)
      
      }
    }
  }

  return (
    <>
      <div className="text-center text-[28px] mb-4 font-bold">Login</div>

      <div className="px-6 pb-1.5 text-[15px]">Email address</div>
      <div className="px-6 pb-2">
        <Input
          max={64}
          placeHolder="Enter your email address"
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
          inputType="email"
          autoFocus={true}
          error=""
        />
      </div>
      <div className="px-6 pb-2">
        <Input
          autoFocus={false}
          max={64}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
          placeHolder="Password"
          inputType="password"
          error=""
        />
      </div>
      <div className="px-6">
        <span className="text-red-500 text-[14px] font-semibold">
          {invalidCredentials}
        </span>
        <button
          onClick={handleLogin}
          disabled={!loginData.email || !loginData.password}
          className={[
            "w-full mt-6 text-[17px] font-semibold text-white py-3 rounded-sm",
            !loginData.email || !loginData.password
              ? "bg-gray-200"
              : "bg-[#F02C56]",
          ].join(" ")}
        >
          Login
        </button>
      </div>
    </>
  )
}

export default Login