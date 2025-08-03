type Env = 'production' | 'default';

const config = {
    production: {
        PORT:process.env.PORT,
        SECRET: process.env.SECRET,
        REFRESH_SECRET: process.env.REFRESH_SECRET,
        DATABASE: process.env.DATABASE_URL
    },
    default: {
        PORT:3000,
        SECRET: 'mysecret',
        REFRESH_SECRET: 'secret',
        DATABASE: 'postgresql://postgres:mysecret@localhost:5432/crypto-payroll-database'
    }
}

export const get = (env: Env) => {
    return config[env] || config.default
}