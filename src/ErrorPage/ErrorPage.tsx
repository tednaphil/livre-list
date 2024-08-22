import './ErrorPage.css';

interface Props {
  error: string
}

function ErrorPage({error} : Props) {
    return(
        <article className='error-page'>
          <h2>Error Page</h2>
          <p>Uh oh!</p>
          <p>{error}</p>
        </article>
    )
}

export default ErrorPage
