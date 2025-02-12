import { EndpointId } from '@layerzerolabs/lz-definitions'
import { ExecutorOptionType } from '@layerzerolabs/lz-v2-utilities'

import type { OAppEdgeConfig, OAppOmniGraphHardhat, OmniPointHardhat } from '@layerzerolabs/toolbox-hardhat'
const sepoliaContract: OmniPointHardhat = {
    eid: EndpointId.SEPOLIA_V2_TESTNET,
    contractName: 'MyONFT721',
}

const arbContract: OmniPointHardhat = {
    eid: 40231,
    contractName: 'MyONFT721',
}

const baseContract: OmniPointHardhat = {
    eid: 40245,
    contractName: 'MyONFT721',
}


const DEFAULT_EDGE_CONFIG: OAppEdgeConfig = {
    enforcedOptions: [
        {
            msgType: 1,
            optionType: ExecutorOptionType.LZ_RECEIVE,
            gas: 100_000,
            value: 0,
        },
        {
            msgType: 2,
            optionType: ExecutorOptionType.COMPOSE,
            index: 0,
            gas: 100_000,
            value: 0,
        },
    ],
}

const config: OAppOmniGraphHardhat = {
    contracts: [
        {
            contract: arbContract,
        },
        {
            contract: sepoliaContract,
        },
        {
            contract: baseContract,
        },
    ],
    connections: [
        {
            from: arbContract,
            to: sepoliaContract,
        },
        {
            from: arbContract,
            to: baseContract,
        },
        {
            from: sepoliaContract,
            to: arbContract,
        },
        {
            from: sepoliaContract,
            to: baseContract,
        },
        {
            from: baseContract,
            to: sepoliaContract,
        },
        {
            from: baseContract,
            to: arbContract,
        },
    ],
}

export default config
