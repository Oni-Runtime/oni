function resolveHandler(...args) {
    let walkTree = [];
    const base = args[0].split('/').reverse();
    const combinationAcc = [];
    const combination = args.slice(1);
    combination.forEach(v => v.split('/').forEach(w => combinationAcc.push(w)));
    const levels = combinationAcc.filter(p => p === '..').length;
    walkTree = base.filter(v => v !== '').slice(levels, base.length).reverse();
    const producedTree = [walkTree.join('/'), ...combinationAcc.filter(v => v !== '..')].filter(v => v !== '');
    const resolved = `/${producedTree.join('/')}`;
    if (combination.some(v => v.indexOf('..') === -1)) {
        let out = args.join('/').replace('./', '', 'g');
        while (out.match(/\.\//)) {
            out = out.replace('./', '', 'g');
        }
        return out;
    } else {
        return resolved.replace('./', '/', 'g');
    }
}

export default {
    resolve: resolveHandler,
}