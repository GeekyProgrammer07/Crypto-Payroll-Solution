#!/bin/bash

pnpm install --filter ./packages/*
pnpm --filter "./packages/*" run build
pnpm install --filter api
pnpm --filter api run prisma:generate
pnpm --filter api run build
