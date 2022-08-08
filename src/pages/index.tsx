import { Dialog, Transition } from '@headlessui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Dispatch, FC, Fragment, ReactNode, SetStateAction, useRef, useState } from 'react'

type ModalProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}
type SlideOverProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  setModal: Dispatch<SetStateAction<boolean>>
  children: ReactNode
}

const Slideover: FC<SlideOverProps> = ({ children, open, setOpen, setModal }) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter='ease-in-out duration-500'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in-out duration-500'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'>
                <Dialog.Panel className='pointer-events-auto relative w-screen max-w-md'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-in-out duration-500'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in-out duration-500'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'>
                    <div className='absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4'>
                      <button
                        type='button'
                        className='rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white'
                        onClick={() => setOpen(false)}>
                        <span className='sr-only'>Close panel</span>
                      </button>
                    </div>
                  </Transition.Child>
                  <div className='flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl'>
                    <div className='px-4 sm:px-6'>
                      <Dialog.Title className='text-lg font-medium text-gray-900'> Panel title </Dialog.Title>
                    </div>
                    <div className='relative mt-6 flex-1 px-4 sm:px-6'>
                      <button
                        type='button'
                        onClick={() => {
                          setModal(true)
                        }}>
                        open modal
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
        {children}
      </Dialog>
    </Transition.Root>
  )
}

const Modal: FC<ModalProps> = ({ open, setOpen }) => {
  const cancelButtonRef = useRef(null)
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed z-10 inset-0 overflow-y-auto'>
          <div className='flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
              <Dialog.Panel className='relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full'>
                <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                  <div className='sm:flex sm:items-start'>
                    <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                      <Dialog.Title as='h3' className='text-lg leading-6 font-medium text-gray-900'>
                        Deactivate account
                      </Dialog.Title>
                      <div className='mt-2'>
                        <p className='text-sm text-gray-500'>
                          Are you sure you want to deactivate your account? All of your data will be
                          permanently removed. This action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                  <button
                    type='button'
                    className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'
                    onClick={() => setOpen(false)}>
                    Deactivate
                  </button>
                  <button
                    type='button'
                    className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}>
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

const Home: NextPage = () => {
  const [modal, setModal] = useState(false)
  const [slideover, setSlideover] = useState(false)
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name='description' content='Generated by create-t3-app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <button className='bg-red-500' onClick={() => setSlideover(true)}>
        open slideover
      </button>

      <Slideover open={slideover} setOpen={setSlideover} setModal={setModal}>
        <Modal open={modal} setOpen={setModal} />
      </Slideover>

      <p className='max-w-prose mx-auto'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa voluptatum animi culpa rerum, nihil odio
        voluptas debitis unde labore quo mollitia quod, nostrum ratione facere reprehenderit atque. Non veniam
        perferendis nisi quis dolorum magni consectetur deleniti. A suscipit quo aliquid. Hic velit eveniet
        qui sunt autem eligendi maxime ratione, ab aspernatur excepturi ipsum fugit fuga quis vero praesentium
        maiores deleniti quos eius, odio nihil veritatis adipisci deserunt doloremque iure. Quae aspernatur
        veritatis repudiandae nostrum sequi aperiam labore eius consectetur facere obcaecati? Minima vel
        incidunt magnam autem itaque obcaecati, ex ipsum beatae, veritatis ratione aspernatur optio. Aliquid,
        veritatis non. Nihil repellendus nostrum numquam ad iure facilis, quis, optio reiciendis fugit magnam
        aliquam distinctio, eius delectus tempora! Quam quis dolor voluptate quae eum, maxime officiis
        blanditiis! Placeat aspernatur dicta est culpa autem nulla sapiente rerum. Ducimus iste, rem culpa,
        quas quis ad error ullam quo ipsa odio expedita velit assumenda sequi possimus quibusdam autem iure ut
        incidunt alias necessitatibus! Amet dignissimos libero, animi, neque consequuntur saepe quia at iusto
        illum nemo minima tempora. Temporibus molestias, maiores incidunt reprehenderit quidem accusantium
        fugit commodi ducimus nobis quam? Ipsum, a dolores consequuntur dolore nisi doloribus natus
        praesentium sint distinctio itaque, non officiis aliquam, delectus debitis! Necessitatibus eum, rerum
        libero porro consequuntur asperiores, voluptate deserunt quod iste iusto nihil nobis cum aliquid
        perferendis modi atque quia sapiente eligendi harum eius, earum delectus! Blanditiis est quae
        laboriosam quo, libero quasi quos laudantium sapiente beatae cupiditate qui in et molestias, illo
        reiciendis. Nam aliquid magni iste vel eligendi animi deleniti rerum, dolore, eius delectus fugit
        nesciunt ratione accusantium corporis. Itaque autem ab minus voluptas. Eos, unde deleniti ea,
        provident sed asperiores nobis repudiandae, dolorum quae tenetur cupiditate veritatis adipisci! Ex,
        impedit. Molestias architecto nisi enim, quidem aliquam explicabo quod temporibus eos hic, iste
        dignissimos ipsa officiis nobis veniam dicta laudantium est in tempore suscipit minus itaque maxime id
        autem neque? Numquam dignissimos vel qui consectetur illum sapiente consequatur aliquid minus esse!
        Placeat, maxime! Nihil debitis quo sapiente vel numquam at neque explicabo, voluptatem, nam minima
        deserunt illum cupiditate natus unde aperiam quas reprehenderit necessitatibus! Earum eos velit
        doloremque explicabo temporibus optio mollitia quo reiciendis blanditiis consequuntur? Libero quod
        dolore repudiandae vel. Mollitia amet nisi, hic similique cupiditate placeat. Autem maiores sunt
        voluptatem excepturi aliquam dolore minus ipsam labore corrupti sapiente odit, cupiditate consequuntur
        nulla tempora illum illo distinctio suscipit quod possimus consequatur repellat qui. Culpa non quam
        labore, debitis similique perspiciatis totam dolorem esse. Quos eos molestiae, reiciendis veritatis
        non repudiandae ad impedit voluptatem facere cupiditate nihil, temporibus maiores. Iusto cumque ullam
        voluptas earum sequi fuga dolorum exercitationem vero dolore minima debitis fugit, impedit similique
        esse obcaecati id blanditiis ut tempore. Quam recusandae earum quibusdam modi, iusto commodi
        distinctio vitae odit non voluptate saepe excepturi. In, earum minus. Itaque vel eius asperiores
        officia ea quaerat veniam provident similique, sed voluptas nostrum iure ipsam molestias quibusdam
        modi blanditiis, nisi corrupti cupiditate labore, illum nesciunt eaque impedit atque sapiente? Fugiat
        doloremque rem a ab cum eius! Mollitia ullam voluptatem voluptatum nihil nam nulla possimus
        consequuntur quaerat ea. Odio, rerum architecto ex repellat, excepturi minus officia quasi, enim
        praesentium distinctio ratione obcaecati porro nemo tempore corrupti iste animi tempora? Animi
        obcaecati quae quis, quasi natus ipsa a nobis laborum? Quaerat beatae sequi nam consequatur placeat.
        Ducimus nobis laboriosam dolore hic numquam tenetur neque repellat deserunt facilis quod. Iste nobis,
        architecto natus vitae dolorem obcaecati sit reprehenderit beatae, adipisci veritatis quos quidem,
        ratione cumque. Quis voluptates repellat, cumque quia itaque, voluptas id impedit aperiam sit beatae
        dignissimos pariatur error eius doloremque minima velit quos consequuntur tempore nostrum facere
        recusandae a eum ut totam. Doloribus dolores corrupti quo obcaecati aliquam maxime mollitia quaerat
        esse saepe possimus qui vero quam at dolorem reprehenderit rerum sunt iusto, debitis nesciunt
        excepturi nam. Sequi, nesciunt. Corrupti, rerum natus laborum eos nulla, animi ab quidem deleniti sint
        veniam, culpa libero ratione quis perspiciatis? Maxime doloremque assumenda voluptatibus minus at
        perspiciatis? Quis ullam hic alias maiores tempora! Alias accusamus saepe autem sit enim tempora atque
        libero laudantium consequuntur aperiam explicabo doloremque quo laborum architecto commodi
        reprehenderit eligendi quod, voluptatum molestiae exercitationem iure voluptate dicta repellendus
        asperiores. Possimus voluptatem sed sequi aliquid quae quos ipsam impedit ad ipsa, repudiandae, magni
        assumenda facilis, error tempore natus dolore sit exercitationem iure tenetur libero quo excepturi.
        Sequi, dolorem aliquam ad at quis repudiandae neque labore, quod enim, saepe reiciendis iusto
        necessitatibus. Labore soluta distinctio blanditiis! Sunt autem sint illo nam fugit esse dolor.
        Adipisci autem tenetur eaque facilis quo nihil numquam minima expedita neque! Expedita laboriosam fuga
        laudantium nihil, eveniet ipsum molestias nesciunt voluptatum suscipit asperiores debitis quibusdam
        magni porro labore unde nisi voluptas facere ex! Alias atque deleniti tempora dolorem nam ipsa beatae
        fugit corrupti? Ipsum recusandae suscipit ab temporibus? Dolore reprehenderit voluptatem illo cum
        harum, totam quos vero ipsum a cupiditate repellat at accusamus amet, ad facilis sapiente illum alias
        earum sequi atque. Consequatur voluptatem nesciunt, saepe velit ratione libero quae ab quia ad aperiam
        iusto asperiores quas delectus nobis nisi sunt sapiente fugiat. Porro obcaecati quod suscipit
        blanditiis in? Nostrum hic labore aliquid impedit explicabo odio natus pariatur veritatis ab quisquam
        modi cum temporibus est soluta minus porro non esse consequuntur quo, deleniti reiciendis eveniet
        inventore! In veniam atque accusamus. Ipsum, maxime commodi, magni sunt nemo aliquid magnam explicabo
        assumenda iusto, harum necessitatibus corrupti repellat sint laboriosam expedita consequatur pariatur
        iure tempore! Eveniet quo vero distinctio optio labore ratione error enim nesciunt, molestiae
        consequatur, voluptate ad consequuntur natus sit aspernatur fugiat numquam, id cumque temporibus
        itaque quaerat cum mollitia impedit facere. Qui rerum aspernatur fugit eum facilis iusto saepe
        deserunt dolorum sint! Itaque dolores laudantium vero, cupiditate, odio aut dicta, quod iusto laborum
        pariatur porro voluptate deserunt asperiores possimus quae animi! Harum praesentium vitae minus fuga
        sunt? Dignissimos, debitis maiores eligendi asperiores provident ducimus eum? Odit in ad hic cumque
        ipsam numquam eos consectetur officiis, dolorum exercitationem eligendi aperiam eaque. Commodi,
        consequatur? Id repellendus amet ullam eius? Quos, nostrum vitae. Debitis ipsam adipisci sed dolorum
        qui magni quas, sapiente saepe?
      </p>
    </>
  )
}

export default Home
