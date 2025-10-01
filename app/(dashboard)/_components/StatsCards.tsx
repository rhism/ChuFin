"use client";

import { GetBalanceStatsResponseType } from '@/app/api/stats/balance/route';
import SkeletonWrapper from '@/components/SkeletonWrapper';
import { Card } from '@/components/ui/card';
import { DateToUTCDate, GetFormatterForCurrency } from '@/lib/helpers';
import { userSettings } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import React, { ReactNode, useCallback, useMemo } from 'react';
import CountUp from "react-countup";


interface Props {
    from: Date;
    to: Date;
    userSettings: userSettings
}
function StatsCards({from, to, userSettings}:Props) {

    const statsQuery = useQuery<GetBalanceStatsResponseType>({
        queryKey: ["overview", "stats", from, to],
        queryFn: () => {
  const fromDate = DateToUTCDate(from ?? new Date());
  const toDate = DateToUTCDate(to ?? new Date());
  return fetch(`/api/stats/balance?from=${fromDate}&to=${toDate}`)
    .then((res) => res.json());
}
});

const formatter = useMemo(() => {
    return GetFormatterForCurrency(userSettings.currency)
}, [userSettings.currency]);

const income = statsQuery.data?.income || 0;
const expense = statsQuery.data?.expense || 0;

const balance = income - expense;

    return (
    <div className="relative flex flex-row w-full flex-wrap gap-2 md:flex-nowrap px-4 md:px-6">
        <SkeletonWrapper isLoading={statsQuery.isFetching}>
            <StatCard 
                formatter={formatter}
                value={income}
                title="Income"
                icon={
                    <TrendingUp className="h-12 w-12 items-center rounded-lg p-2 text-emerald-500 bg-emerald-400/10" />
                }
                />
        </SkeletonWrapper>


        <SkeletonWrapper isLoading={statsQuery.isFetching}>
            <StatCard 
                formatter={formatter}
                value={expense}
                title="Expense"
                icon={
                    <TrendingDown className="h-12 w-12 items-center rounded-lg p-2 text-red-500 bg-red-400/10" />
                }
                />
        </SkeletonWrapper>


        <SkeletonWrapper isLoading={statsQuery.isFetching}>
            <StatCard 
                formatter={formatter}
                value={balance}
                title="Balance"
                icon={
                    <Wallet className="h-12 w-12 items-center rounded-lg p-2 text-cyan-500 bg-cyan-400/10" />
                }
                />
        </SkeletonWrapper>
    </div>
    );
}

export default StatsCards;

function StatCard({formatter, value, title, icon}: {
    formatter: Intl.NumberFormat;
    icon: ReactNode;
    title: string;
    value: number;
}) {

    const formatFn = useCallback((value:number) => {
        return formatter.format(value);
    }, 
    [formatter]
    );

    return (
        <Card className="relative h-24 w-full flex flex-row items-center gap-4 p-4">
                {icon}
            <div className="flex flex-col items-start justify-center">
                <p className="text-muted-foreground">{title}</p>
                <CountUp 
                preserveValue
                redraw={false}
                end={value}
                decimals={2}
                formattingFn={formatFn}
                className="text-2xl"
                />
            </div>
        </Card>
    )
}