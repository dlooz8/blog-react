import { useNavigate } from 'react-router-dom';

const Aboutus = () => {
  const navigate = useNavigate();

  return (
    <section className="flex items-centerxl:h-screen font-montserrat">
        <div className="justify-center flex-1 max-w-6xl pb-4 mx-auto lg:pb-6 md:px-6">
            <div className="relative flex flex-col items-center text-center">
                <div
                    className="absolute hidden md:block -top-14 text-center text-[120px] text-gray-400 font-bold opacity-10">
                    What We Do?
                </div>
                <h1 className="text-5xl font-bold"> Чем<span className="text-red-500"> мы занимаемся?</span> 
                </h1>
                <div className="flex w-24 mt-1 mb-10 overflow-hidden rounded">
                    <div className="flex-1 h-2 bg-red-200">
                    </div>
                    <div className="flex-1 h-2 bg-red-600">
                    </div>
                    <div className="flex-1 h-2 bg-red-400">
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap ">
              <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
                  <img src="http://speedhunters-wp-production.s3.amazonaws.com/wp-content/uploads/2023/10/23171952/IND-G87-SH-18-680x453.jpg" alt=""
                      className="relative z-40 object-cover w-full h-96 rounded-sm">
                  </img>
              </div>
              <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0 ">
                  <h2
                      className="py-3 pl-2 mb-4 text-2xl font-bold text-gray-700 border-l-4 border-red-500">
                      We are providing a better facility
                  </h2>
                  <p className="mb-4 text-base leading-7 text-gray-500">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut
                      labore et dolore magna aliqua. Ut enim ad minim veniam
                  </p>
                  <ul className="mb-10">
                      <li className="flex items-center mb-4 text-base text-gray-600">
                          <span className="mr-3 text-red-500 dark:text-red-400 ">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                  className="w-5 h-5 bi bi-patch-check-fill" viewBox="0 0 16 16">
                                  <path
                                      d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                              </svg>
                          </span>
                          Lorem ipsum dolor sit amet, consectetur domino act
                      </li>
                      <li className="flex items-center mb-4 text-base text-gray-600">
                          <span className="mr-3 text-red-500 dark:text-red-400">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                  className="w-5 h-5 bi bi-patch-check-fill" viewBox="0 0 16 16">
                                  <path
                                      d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                              </svg>
                          </span>
                          eli orem ipsum dolor sit amet, consectetur advice
                      </li>
                      <li className="flex items-center mb-4 text-base text-gray-600">
                          <span className="mr-3 text-red-500 dark:text-red-400 ">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                  className="w-5 h-5 bi bi-patch-check-fill" viewBox="0 0 16 16">
                                  <path
                                      d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                              </svg>
                          </span>
                          Iron man ipsum dolor sit amet, consectetur adipiscing
                      </li>
                  </ul>
                  <a href="#"
                      onClick={() => navigate('/contacts')}
                      className="align-center rounded-lg text-center bg-red-500 hover:bg-red-600 duration-200 px-5 py-3 text-sm font-medium text-white">
                      Связаться с нами
                  </a>
              </div>
          </div>
      </div>
    </section>
  )
}

export { Aboutus };
