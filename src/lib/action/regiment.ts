"use server"
import {Regiment} from "@prisma/client";
import {AddRegimentInputType} from "@/app/list/regiments/_components/CreateRegiment";
import prisma from "@/lib/prisma";
import {z} from "zod";


export const addRegiment = async (createRegimentData: AddRegimentInputType) => {
   const basic: Omit<Regiment, "id" | "createdAt" | "updatedAt">  = {
       title: createRegimentData.title,
       description: createRegimentData.description,
       badgeUrl: createRegimentData.badgeUrl
   }

   try{
      const regiment = await prisma.regiment.create({
          data: {
              ...basic,
              battleHonours:{
                 create: createRegimentData.battleHonours.map((battle) => ({
                     title: battle.title,
                     description: battle.description,
                     dateStart: battle.dateStart,
                     dateEnd: battle.dateEnd
                 })),
              }
          }
      })
   }catch(error){

   }
}