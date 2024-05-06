import Header from '@/components/shared/Header'
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants'
import { auth } from '@clerk/nextjs/server';
import { getUserById } from '@/lib/actions/users.actions';
import { Transform } from 'stream';
import { redirect } from 'next/navigation';

const addTransformationTypePage = async ({ params:{ type } }: SearchParamProps) => {
  const { userId } = auth();
  const transformation = transformationTypes[type];

  if(!userId) redirect('/sign-in');
  const user = await getUserById(userId);

  return (
    <>
      <Header 
        title = { transformation.title }
        subtitle = { transformation.subTitle }
      />

      <section className='mt-10'>
        <TransformationForm
          action = "Add"
          userId={user._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </>
  )
}

export default addTransformationTypePage