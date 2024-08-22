import './ErrorPage.css';

interface Props {
  error: string
}

function ErrorPage({error} : Props) {
    return(
        <>
          <h2>Error Page</h2>
          <p>Uh oh!</p>
          <p>{error}</p>
        </>
    )
}

export default ErrorPage
