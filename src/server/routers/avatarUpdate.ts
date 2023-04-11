import { z } from "zod"
import { procedure } from "../trpc"
import sharp from "sharp"
import fs from "fs"
import { v4 as uuid } from "uuid"
import { prisma } from "../prisma"
import { fileStoragePath } from "@/env"

export const avatarUpdate = procedure
	.input(
		z.object({
			source: z.string(),
		})
	)
	.mutation(async ({ input: { source }, ctx: { me } }) => {
		if (!me) return

		// process image
		let avatarId = uuid()
		try {
			let buffer = Buffer.from(source.split(";base64,")[1], "base64")
			let image = await sharp(buffer).resize(128, 128)

			let dir = `${fileStoragePath}/avatars/${me.id}/${avatarId}`
			fs.mkdirSync(dir, { recursive: true })
			await image.toFile(`${dir}/128.png`)
		} catch (err) {
			return
		}

		// update user
		await prisma.user.update({
			where: {
				id: me.id,
			},
			data: {
				avatar: avatarId,
			},
		})
	})
