import './Home.css';
import flatstack from '../Images/flatstack.avif'

function Home() {
    return(
        <>
        <div className='home-wrapper'>
          <img src={flatstack} alt='illustration of book spines'/>
          <aside className='home-info'>
            <h2>Welcome to <span>LivreList</span> – Your Ultimate Book Organizer!</h2>
            <p>
              Manage your reading journey with ease.
              LivreList is an app designed to help you find books and organize them into personalized collections called "shelves."
              Whether you're an avid reader, a casual book lover, or building a home library, LivreList is here to streamline your book tracking and inventory management.
            </p>
            <h3>Key Features</h3>
            <ul>
              <li><span>Advanced Search:</span> Search the Google Books collection for your book of choice with our search and filtering functionality.</li>
              <li><span>Personalized Shelves:</span> Create and customize shelves to categorize your books however you like—by genre, author, reading status, or your own unique system.</li>
              <li><span>Home Library Inventory:</span> Easily manage your personal collection and never lose track of a book again.</li>
            </ul>

           <p> Happy reading!</p>
          </aside>
        </div>
        </>
    )
}

export default Home