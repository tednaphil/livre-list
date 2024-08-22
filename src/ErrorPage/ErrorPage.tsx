import './ErrorPage.css';

interface Props {
  error: string
}

function ErrorPage({error} : Props) {
    return(
        <article className='error-page'>
          <h2>Uh oh!</h2>
          <p>{error}</p>
        </article>
    )
}

export default ErrorPage
