import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'
import CreateTransactionDialog from './_components/CreateTransactionDialog';
import Overview from './_components/Overview';
import History from './_components/History';

async function page() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const userSettings = await prisma.userSettings.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!userSettings) {
    redirect("/wizard");
  }

  return ( 
  <div className="h-full bg-background">
    <div className="border-b  bg-card">
      <div className="relative flex flex-wrap items-center justify-between gap-6 px-8 py-6">
        <p className="text-2xl font-bold">
          Hello, {user.firstName}! 👋</p>
          <div className="flex items-center gap-3">

            <CreateTransactionDialog trigger={
            <Button 
            variant={"default"} 
            className="border-cyan-500 border bg-cyan-950 text-white hover:bg-cyan-700 hover:text-white">
              New income 📈
            </Button>}
            type="income" />

            <CreateTransactionDialog trigger={
            <Button 
            variant={"default"} 
            className="border-rose-500 border bg-rose-950 text-white hover:bg-rose-700 hover:text-white">
              New expense 📉
            </Button>}
            type="expense" />
          </div>
      </div>
    </div>
    <Overview userSettings={userSettings} />
    <History userSettings={userSettings} />
  </div>
  )
}

export default page