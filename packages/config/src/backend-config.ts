type Env = 'production' | 'default';

const config = {
    production: {
        PORT:process.env.PORT,
        SECRET: process.env.SECRET,
        DATABASE: process.env.DATABASE_URL
    },
    default: {
        PORT:3000,
        SECRET: 'mysecret',
        DATABASE: 'postgresql://postgres:mysecret@localhost:5432/crypto-payroll-database'
    }
}

export const get = (env: Env) => {
    return config[env] || config.default
}