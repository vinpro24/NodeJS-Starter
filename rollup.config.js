
import resolve from '@rollup/plugin-node-resolve';

export default {
    input: 'src/index.js',
    output: {
        file: 'build/bundle.js',
        format: 'esm'
    },
    plugins: [
        resolve({
            customResolveOptions: {
                moduleDirectory: 'node_modules/**'
            }
        })
    ]
};