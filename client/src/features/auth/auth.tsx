import { useCurrentQuery } from "../../app/services/auth"
import { Audio } from 'react-loader-spinner'


export const Auth = ({ children }: {children: JSX.Element}) => {

    const { isLoading } = useCurrentQuery()

    if (isLoading) {
      return <span>Loading...</span> 
      
    }

  return children
}
