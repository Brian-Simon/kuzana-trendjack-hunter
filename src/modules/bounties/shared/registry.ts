import type { BountyModule } from './types';

export const bountyModules: BountyModule[] = [
  {
    id: 1,
    title: 'AI Financial Controller',
    summary: 'Monthly finance risk detection, reconciliation checks, and follow-up workflows for messy SME books.',
    status: 'planned',
    delivery: 'Zoho Books ingestion, anomaly detection, monthly risk report, and founder/accountant checklist.',
    integrationNotes: 'Built to plug into accounting APIs first, then scoring workflows and later Avalanche-backed audit trails.',
  },
  {
    id: 2,
    title: 'Trendjack Hunter',
    summary: 'Monitors public signals, classifies founder-relevant trends, and produces a ready-to-shoot content brief.',
    status: 'prototype',
    delivery: 'Live trend scan, topic classification, content angle, hook, 60-second script, and remix template.',
    integrationNotes: 'Source adapters are separated from the brief generator so new APIs can be added without touching the output engine.',
  },
  {
    id: 3,
    title: 'Boardy.ai for Kuzana',
    summary: 'A matching engine for warm introductions across founders, operators, builders, and investors.',
    status: 'planned',
    delivery: 'Profile capture, match scoring, and context-rich intro generation.',
    integrationNotes: 'Conversation interface can later switch between chat, voice, and event-driven data capture.',
  },
  {
    id: 4,
    title: 'Equity Investing Legal Framework',
    summary: 'Plain-language Kenyan startup investment templates with practical safeguards.',
    status: 'planned',
    delivery: 'Kenya-adapted agreement templates and founder-friendly plain-English summaries.',
    integrationNotes: 'Document workflow can plug into legal review, e-signature, and future clause libraries.',
  },
  {
    id: 5,
    title: 'Hidden Champions Discovery Engine',
    summary: 'Finds overlooked Kenyan businesses using public signals, then profiles the ones with real fundamentals.',
    status: 'planned',
    delivery: 'Discovery pipeline, scoring model, and repeatable research process.',
    integrationNotes: 'Designed for registries, maps, directories, and referral systems as separate source adapters.',
  },
  {
    id: 6,
    title: 'Kuzana Brain',
    summary: 'Institutional knowledge retrieval with citations, access control, and document ingestion.',
    status: 'planned',
    delivery: 'Document pipeline, semantic search, cited answers, and document-level permissions.',
    integrationNotes: 'Knowledge sources are abstracted so Google Docs, PDFs, WhatsApp exports, and future storage systems can coexist.',
  },
];
