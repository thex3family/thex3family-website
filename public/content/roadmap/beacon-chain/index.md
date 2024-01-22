---
title: The Beacon Chain
description: Learn about the Beacon Chain - the upgrade that introduced proof-of-stake Ethereum.
lang: en
template: main
image: /upgrades/core.png
alt: 
summaryPoint1: The Beacon Chain introduced proof-of-stake to the Ethereum ecosystem.
summaryPoint2: It was merged with the original Ethereum proof-of-work chain in September 2022.
summaryPoint3: The Beacon Chain introduced the consensus logic and block gossip protocol which now secures Ethereum.
---

## What does the Beacon Chain do? {#what-does-the-beacon-chain-do}

The Beacon Chain is the name given to a ledger of accounts that conducted and coordinated the network of Ethereum [stakers](/staking/) before those stakers started validating real Ethereum blocks. It does not process transactions or handle smart contract interactions though because that is being done in the execution layer.
The Beacon Chain is responsible for things like block and attestation handling, running the fork choice algorithm, and managing rewards and penalties.
Read more on our [node architecture page](/developers/docs/nodes-and-clients/node-architecture/#node-comparison).

## Beacon Chain impact {#beacon-chain-features}

### Introducing staking {#introducing-staking}

The Beacon Chain introduced [proof-of-stake](/developers/docs/consensus-mechanisms/pos/) to Ethereum. This keeps Ethereum secure and earns validators more ETH in the process. In practice, staking involves staking ETH in order to activate validator software. As a staker, you run the software that creates and validates new blocks in the chain.

Staking serves a similar purpose that [mining](/developers/docs/mining/) used to, but is different in many ways. Mining required large up-front expenditures in the form of powerful hardware and energy consumption, resulting in economies of scale, and promoting centralization. Mining also did not come with any requirement to lock up assets as collateral, limiting the protocol's ability to punish bad actors after an attack.

The transition to proof-of-stake made Ethereum significantly more secure and decentralized by comparison to proof-of-work. The more people that participate in the network, the more decentralized and safe from attacks it becomes.

And using proof-of-stake as consensus mechanism is a foundational component for [the secure, environmentally friendly and scalable Ethereum we have now](/roadmap/vision/).

<InfoBanner emoji=":money_bag:">
  If you're interested in becoming a validator and helping secure Ethereum, <a href="/staking/">learn more about staking</a>.
</InfoBanner>

### Setting up for sharding {#setting-up-for-sharding}

Since the Beacon Chain merged with the original Ethereum Mainnet, the Ethereum community started looking to scaling the network.

Proof-of-stake has the advantage of having a registry of all approved block producers at any given time, each with ETH at stake. This registry sets the stage for the ability to divide and conquer but reliably split up specific network responsibilities.

This responsibility is in contrast to proof-of-work, where miners have no obligation to the network and could stop mining and turn their node software off permanently in an instant without repercussion. There is also no registry of known block proposers and no reliable way to split network responsibilities safely.

[More on sharding](/roadmap/danksharding/)

## Relationship between upgrades {#relationship-between-upgrades}

The Ethereum upgrades are all somewhat interrelated. So let’s recap how the Beacon Chain affects the other upgrades.

### Beacon Chain and The Merge {#merge-and-beacon-chain}

At first, The Beacon Chain existed separately from Ethereum Mainnet, but they were merged in 2022.

<ButtonLink to="/roadmap/merge/">
  The Merge
</ButtonLink>

### Shards and the Beacon Chain {#shards-and-beacon-chain}

Sharding can only safely enter the Ethereum ecosystem with a proof-of-stake consensus mechanism in place. The Beacon Chain introduced staking, which 'merged' with Mainnet, paving the way for sharding to help further scale Ethereum.

<ButtonLink to="/roadmap/danksharding/">
  Shard chains
</ButtonLink>

## Further Reading

- [More on Ethereum's future upgrades](/roadmap/vision)
- [More on node architecture](/developers/docs/nodes-and-clients/node-architecture)
- [More of proof-of-stake](/developers/docs/consensus-mechanisms/pos)
