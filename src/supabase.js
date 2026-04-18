import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

const supabaseUrl     = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── Leads ────────────────────────────────────────────────────────────────────
export function useLeads(userId) {
  const [leads, setLeads]     = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { if (userId) fetch(); }, [userId]);

  async function fetch() {
    setLoading(true);
    const { data } = await supabase.from("leads").select("*")
      .eq("user_id", userId).order("created_at", { ascending: false });
    setLeads(data || []);
    setLoading(false);
  }

  async function addLead(lead) {
    const { data, error } = await supabase.from("leads")
      .insert({ ...lead, user_id: userId }).select().single();
    if (!error) setLeads(p => [data, ...p]);
    return { data, error };
  }

  async function updateLead(id, changes) {
    const { error } = await supabase.from("leads").update(changes).eq("id", id);
    if (!error) setLeads(p => p.map(l => l.id === id ? { ...l, ...changes } : l));
    return { error };
  }

  async function deleteLead(id) {
    const { error } = await supabase.from("leads").delete().eq("id", id);
    if (!error) setLeads(p => p.filter(l => l.id !== id));
    return { error };
  }

  async function deleteLeads(ids) {
    const { error } = await supabase.from("leads").delete().in("id", ids);
    if (!error) setLeads(p => p.filter(l => !ids.includes(l.id)));
    return { error };
  }

  return { leads, loading, addLead, updateLead, deleteLead, deleteLeads, refetch: fetch };
}

// ─── Contacts ─────────────────────────────────────────────────────────────────
export function useContacts(userId) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => { if (userId) fetch(); }, [userId]);

  async function fetch() {
    setLoading(true);
    const { data } = await supabase.from("contacts").select("*")
      .eq("user_id", userId).order("created_at", { ascending: false });
    setContacts(data || []);
    setLoading(false);
  }

  async function addContact(contact) {
    const { data, error } = await supabase.from("contacts")
      .insert({ ...contact, user_id: userId }).select().single();
    if (!error) setContacts(p => [data, ...p]);
    return { data, error };
  }

  async function updateContact(id, changes) {
    const { error } = await supabase.from("contacts").update(changes).eq("id", id);
    if (!error) setContacts(p => p.map(c => c.id === id ? { ...c, ...changes } : c));
    return { error };
  }

  async function deleteContact(id) {
    const { error } = await supabase.from("contacts").delete().eq("id", id);
    if (!error) setContacts(p => p.filter(c => c.id !== id));
    return { error };
  }

  return { contacts, loading, addContact, updateContact, deleteContact, refetch: fetch };
}

// ─── Campaigns ────────────────────────────────────────────────────────────────
export function useCampaigns(userId) {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading]     = useState(true);

  useEffect(() => { if (userId) fetch(); }, [userId]);

  async function fetch() {
    setLoading(true);
    const { data } = await supabase.from("campaigns").select("*")
      .eq("user_id", userId).order("created_at", { ascending: false });
    setCampaigns(data || []);
    setLoading(false);
  }

  async function addCampaign(campaign) {
    const { data, error } = await supabase.from("campaigns")
      .insert({ ...campaign, user_id: userId }).select().single();
    if (!error) setCampaigns(p => [data, ...p]);
    return { data, error };
  }

  async function updateCampaign(id, changes) {
    const { error } = await supabase.from("campaigns").update(changes).eq("id", id);
    if (!error) setCampaigns(p => p.map(c => c.id === id ? { ...c, ...changes } : c));
    return { error };
  }

  async function deleteCampaign(id) {
    const { error } = await supabase.from("campaigns").delete().eq("id", id);
    if (!error) setCampaigns(p => p.filter(c => c.id !== id));
    return { error };
  }

  return { campaigns, loading, addCampaign, updateCampaign, deleteCampaign, refetch: fetch };
}

// ─── Deals ────────────────────────────────────────────────────────────────────
export function useDeals(userId) {
  const [deals, setDeals]     = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { if (userId) fetch(); }, [userId]);

  async function fetch() {
    setLoading(true);
    const { data } = await supabase.from("deals").select("*")
      .eq("user_id", userId).order("created_at", { ascending: false });
    setDeals(data || []);
    setLoading(false);
  }

  async function addDeal(deal) {
    const { data, error } = await supabase.from("deals")
      .insert({ ...deal, user_id: userId }).select().single();
    if (!error) setDeals(p => [data, ...p]);
    return { data, error };
  }

  async function updateDeal(id, changes) {
    const { error } = await supabase.from("deals").update(changes).eq("id", id);
    if (!error) setDeals(p => p.map(d => d.id === id ? { ...d, ...changes } : d));
    return { error };
  }

  async function deleteDeal(id) {
    const { error } = await supabase.from("deals").delete().eq("id", id);
    if (!error) setDeals(p => p.filter(d => d.id !== id));
    return { error };
  }

  return { deals, loading, addDeal, updateDeal, deleteDeal, refetch: fetch };
}

// ─── Email (via Vercel API route) ─────────────────────────────────────────────
export async function sendEmail({ to, subject, html, fromName, fromEmail }) {
  const res = await fetch("/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ to, subject, html, fromName, fromEmail }),
  });
  return res.json();
}
