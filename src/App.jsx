import { useState, useEffect } from "react";
import {
  LayoutDashboard, Users, Mail, BarChart2, Settings, Bell, Search,
  Plus, ChevronRight, ChevronDown, MoreHorizontal, Play, Pause,
  Trash2, Copy, Filter, Download, Upload, CheckCircle, Clock,
  XCircle, ArrowRight, Zap, Target, TrendingUp, MessageSquare,
  UserPlus, RefreshCw, Send, Inbox, Star, Archive, Eye,
  Edit3, LogOut, Menu, X, AlertCircle, Check, ChevronLeft,
  Link2, FileText, Activity, Briefcase, DollarSign, Phone,
  Tag, StickyNote, Calendar, MapPin, Building2, ExternalLink,
  ChevronUp, GripVertical, Circle, CheckSquare, PlusCircle,
  Layers, Globe, Linkedin, Twitter, User, AtSign, Hash,
  ArrowUpRight, BarChart as BarChartIcon, Percent, TrendingDown, FolderOpen,
  Contact, UsersRound, Network, Handshake,
  ThumbsUp, Mic, MessageCircle, Heart, GitBranch, Award,
  Webhook, MoveRight, MousePointerClick, Volume2, FlaskConical,
  Video, MailOpen, Reply, Paperclip, CalendarDays
} from "lucide-react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

// ─── Mock Data ──────────────────────────────────────────────────────────────

const analyticsData = [
  { day: "Mon", sent: 45, accepted: 18, replied: 8 },
  { day: "Tue", sent: 62, accepted: 24, replied: 11 },
  { day: "Wed", sent: 38, accepted: 15, replied: 6 },
  { day: "Thu", sent: 75, accepted: 32, replied: 19 },
  { day: "Fri", sent: 90, accepted: 41, replied: 23 },
  { day: "Sat", sent: 20, accepted: 9, replied: 4 },
  { day: "Sun", sent: 15, accepted: 5, replied: 2 },
];

const campaigns = [
  // ── LinkedIn ──────────────────────────────────────────────
  {
    id: 1, channel: "linkedin", name: "SaaS Founders Outreach", status: "active",
    leads: 342, accepted: 128, replied: 47, pending: 167,
    steps: 5, created: "Mar 15, 2026", lastActivity: "2h ago",
    acceptRate: 37, replyRate: 37,
  },
  {
    id: 2, channel: "linkedin", name: "Tech CTOs Q2 2026", status: "active",
    leads: 215, accepted: 89, replied: 31, pending: 95,
    steps: 4, created: "Mar 28, 2026", lastActivity: "45m ago",
    acceptRate: 41, replyRate: 35,
  },
  {
    id: 3, channel: "linkedin", name: "HR Directors Network", status: "paused",
    leads: 180, accepted: 52, replied: 18, pending: 110,
    steps: 3, created: "Feb 10, 2026", lastActivity: "3d ago",
    acceptRate: 29, replyRate: 35,
  },
  {
    id: 4, channel: "linkedin", name: "Series A Startups", status: "draft",
    leads: 0, accepted: 0, replied: 0, pending: 0,
    steps: 6, created: "Apr 4, 2026", lastActivity: "just now",
    acceptRate: 0, replyRate: 0,
  },
  // ── Email ─────────────────────────────────────────────────
  {
    id: 5, channel: "email", name: "Dev Tools Cold Outreach", status: "active",
    leads: 520, sent: 520, opened: 249, clicked: 78, bounced: 12, replied: 61,
    steps: 4, created: "Mar 20, 2026", lastActivity: "1h ago",
    openRate: 48, clickRate: 15, replyRate: 12, bounceRate: 2,
    fromName: "Basar K.", fromEmail: "basar@openreach.io",
    subject: "Quick question about your dev tooling stack",
  },
  {
    id: 6, channel: "email", name: "Enterprise SaaS Follow-Up", status: "active",
    leads: 310, sent: 310, opened: 148, clicked: 42, bounced: 7, replied: 38,
    steps: 3, created: "Apr 1, 2026", lastActivity: "3h ago",
    openRate: 48, clickRate: 14, replyRate: 12, bounceRate: 2,
    fromName: "Basar K.", fromEmail: "basar@openreach.io",
    subject: "Following up on our LinkedIn connection",
  },
  {
    id: 7, channel: "email", name: "Re-engagement Q2 2026", status: "paused",
    leads: 190, sent: 190, opened: 66, clicked: 19, bounced: 4, replied: 14,
    steps: 2, created: "Feb 28, 2026", lastActivity: "5d ago",
    openRate: 35, clickRate: 10, replyRate: 7, bounceRate: 2,
    fromName: "Basar K.", fromEmail: "basar@openreach.io",
    subject: "Still worth a conversation?",
  },
  {
    id: 8, channel: "email", name: "Product Launch Announcement", status: "draft",
    leads: 0, sent: 0, opened: 0, clicked: 0, bounced: 0, replied: 0,
    steps: 3, created: "Apr 5, 2026", lastActivity: "just now",
    openRate: 0, clickRate: 0, replyRate: 0, bounceRate: 0,
    fromName: "Basar K.", fromEmail: "basar@openreach.io",
    subject: "We just launched something you'll want to see",
  },
  // ── Multi-channel ─────────────────────────────────────────
  {
    id: 9, channel: "multichannel", name: "VP Sales End-to-End", status: "active",
    leads: 140, accepted: 58, replied: 22, pending: 62,
    sent: 140, opened: 91, clicked: 28, replied_email: 19,
    steps: 7, created: "Mar 25, 2026", lastActivity: "30m ago",
    acceptRate: 41, replyRate: 16,
    openRate: 65, clickRate: 20,
  },
];

const emailTemplates = [
  {
    id: 1, name: "Cold Intro – Dev Tools", category: "Cold Outreach",
    subject: "Quick question about your dev tooling stack",
    body: `Hi {{first_name}},

I came across your work at {{company}} and was impressed by what your team is building.

I'm reaching out because we've been working on a developer productivity platform that's helped teams like yours cut deployment time by 40%.

Would you be open to a quick 15-minute call to see if there's a fit?

Best,
Basar`,
    openRate: 48, clickRate: 15, usedIn: 1,
  },
  {
    id: 2, name: "LinkedIn Follow-Up", category: "Follow Up",
    subject: "Following up on our LinkedIn connection",
    body: `Hi {{first_name}},

We connected on LinkedIn recently and I wanted to follow up properly via email.

I noticed {{company}} is scaling fast — congrats on that. We help similar companies streamline their outbound at scale.

Happy to share a quick case study if that's useful. Worth a chat?

Basar`,
    openRate: 44, clickRate: 12, usedIn: 1,
  },
  {
    id: 3, name: "Re-engagement Bump", category: "Re-engagement",
    subject: "Still worth a conversation?",
    body: `Hi {{first_name}},

I reached out a few weeks back but didn't hear back — totally understand, inboxes get busy.

I just wanted to send one last note in case the timing is better now. We recently helped a {{industry}} company similar to {{company}} improve their pipeline by 30%.

If now's not the right time, no worries at all — happy to reconnect later.

Basar`,
    openRate: 35, clickRate: 10, usedIn: 1,
  },
  {
    id: 4, name: "Product Launch Blast", category: "Announcements",
    subject: "We just launched something you'll want to see",
    body: `Hi {{first_name}},

Exciting news — we just launched [Feature Name], designed specifically for teams like yours at {{company}}.

Here's what it means for you:
• Automate outbound in minutes
• Personalise at scale with AI
• Track every touchpoint in one place

👉 [See it in action]

Would love your feedback if you have 10 minutes.

Basar`,
    openRate: 0, clickRate: 0, usedIn: 0,
  },
];

const leads = [
  { id: 1, name: "Alice Johnson", title: "VP of Engineering", company: "Stripe", location: "San Francisco, CA", status: "replied", campaign: "SaaS Founders Outreach", addedDate: "Mar 16", avatar: "AJ" },
  { id: 2, name: "Marcus Chen", title: "CTO", company: "Notion", location: "New York, NY", status: "accepted", campaign: "Tech CTOs Q2 2026", addedDate: "Mar 29", avatar: "MC" },
  { id: 3, name: "Priya Patel", title: "Head of Growth", company: "Figma", location: "Austin, TX", status: "pending", campaign: "SaaS Founders Outreach", addedDate: "Mar 17", avatar: "PP" },
  { id: 4, name: "David Kim", title: "Co-Founder & CEO", company: "Linear", location: "Remote", status: "replied", campaign: "SaaS Founders Outreach", addedDate: "Mar 18", avatar: "DK" },
  { id: 5, name: "Sarah Williams", title: "Director of HR", company: "Airbnb", location: "Seattle, WA", status: "pending", campaign: "HR Directors Network", addedDate: "Feb 12", avatar: "SW" },
  { id: 6, name: "James Rodriguez", title: "CTO", company: "Vercel", location: "Miami, FL", status: "accepted", campaign: "Tech CTOs Q2 2026", addedDate: "Mar 30", avatar: "JR" },
  { id: 7, name: "Emma Davis", title: "Founder", company: "Loom", location: "Chicago, IL", status: "rejected", campaign: "SaaS Founders Outreach", addedDate: "Mar 20", avatar: "ED" },
  { id: 8, name: "Noah Brown", title: "VP of Sales", company: "HubSpot", location: "Boston, MA", status: "pending", campaign: "SaaS Founders Outreach", addedDate: "Mar 21", avatar: "NB" },
];

const conversations = [
  {
    id: 1, name: "Alice Johnson", title: "VP of Engineering @ Stripe",
    avatar: "AJ", lastMessage: "Thanks for reaching out! I'd love to connect and hear more about what you're working on.",
    time: "10:32 AM", unread: 2, starred: true,
    messages: [
      { id: 1, sender: "me", text: "Hi Alice, I noticed your work on Stripe's infrastructure team — really impressive scaling work. I'd love to connect!", time: "Yesterday 9:00 AM" },
      { id: 2, sender: "them", text: "Thanks for reaching out! I'd love to connect and hear more about what you're working on.", time: "Yesterday 11:15 AM" },
      { id: 3, sender: "me", text: "Happy to be connected! I'm working on a developer tools platform and would love your insights on what engineering teams at scale need most.", time: "Yesterday 2:00 PM" },
      { id: 4, sender: "them", text: "Thanks for reaching out! I'd love to connect and hear more about what you're working on.", time: "10:32 AM" },
    ],
  },
  {
    id: 2, name: "David Kim", title: "Co-Founder & CEO @ Linear",
    avatar: "DK", lastMessage: "Sure, let's find a time to chat. I'm free Thursday afternoon.",
    time: "Yesterday", unread: 0, starred: false,
    messages: [
      { id: 1, sender: "me", text: "Hi David, huge fan of Linear. The DX you've built is exceptional. Would love to connect!", time: "Mar 18 9:00 AM" },
      { id: 2, sender: "them", text: "Sure, let's find a time to chat. I'm free Thursday afternoon.", time: "Mar 19 3:00 PM" },
    ],
  },
  {
    id: 3, name: "Marcus Chen", title: "CTO @ Notion",
    avatar: "MC", lastMessage: "I'll pass this along to our partnerships team.",
    time: "Mon", unread: 0, starred: true,
    messages: [
      { id: 1, sender: "me", text: "Hi Marcus, I've been following Notion's growth — congrats on the recent milestones! I'd love to connect.", time: "Mar 29 10:00 AM" },
      { id: 2, sender: "them", text: "I'll pass this along to our partnerships team.", time: "Apr 1 9:00 AM" },
    ],
  },
];

// ─── CRM Mock Data ───────────────────────────────────────────────────────────

const PIPELINE_STAGES = [
  { id: "lead",      label: "New Lead",       color: "bg-slate-400",   light: "bg-slate-50  border-slate-200",  count: 0 },
  { id: "connected", label: "Connected",      color: "bg-blue-500",    light: "bg-blue-50   border-blue-200",   count: 0 },
  { id: "interested",label: "Interested",     color: "bg-violet-500",  light: "bg-violet-50 border-violet-200", count: 0 },
  { id: "meeting",   label: "Meeting Booked", color: "bg-amber-500",   light: "bg-amber-50  border-amber-200",  count: 0 },
  { id: "won",       label: "Closed Won",     color: "bg-emerald-500", light: "bg-emerald-50 border-emerald-200", count: 0 },
  { id: "lost",      label: "Closed Lost",    color: "bg-red-400",     light: "bg-red-50    border-red-200",    count: 0 },
];

const crmDeals = [
  {
    id: 1, stage: "won", name: "Alice Johnson", title: "VP of Engineering", company: "Stripe",
    avatar: "AJ", value: 12000, currency: "$", tags: ["Enterprise", "Hot"],
    email: "alice@stripe.com", phone: "+1 415 555 0101", location: "San Francisco, CA",
    source: "SaaS Founders Outreach", lastContact: "Today",
    notes: [
      { id: 1, author: "Basar K.", text: "Agreed on a 30-min demo next Tuesday. Very interested in the team collaboration features.", date: "Apr 5, 2026", type: "note" },
      { id: 2, author: "Basar K.", text: "Sent follow-up deck with pricing.", date: "Apr 3, 2026", type: "note" },
    ],
    activity: [
      { id: 1, type: "message", text: "Replied to LinkedIn message", date: "Apr 5, 10:32 AM" },
      { id: 2, type: "connect", text: "Connection accepted", date: "Mar 17, 9:15 AM" },
      { id: 3, type: "lead",    text: "Added to CRM from campaign", date: "Mar 16, 8:00 AM" },
    ],
  },
  {
    id: 2, stage: "meeting", name: "David Kim", title: "Co-Founder & CEO", company: "Linear",
    avatar: "DK", value: 8500, currency: "$", tags: ["Startup", "Warm"],
    email: "david@linear.app", phone: "+1 212 555 0188", location: "Remote",
    source: "SaaS Founders Outreach", lastContact: "Yesterday",
    notes: [
      { id: 1, author: "Basar K.", text: "Call scheduled for Thursday 3pm. He wants to see the API docs first.", date: "Apr 4, 2026", type: "note" },
    ],
    activity: [
      { id: 1, type: "meeting", text: "Meeting booked for Thursday", date: "Apr 4, 2:00 PM" },
      { id: 2, type: "message", text: "Replied to LinkedIn message", date: "Mar 19, 3:00 PM" },
      { id: 3, type: "connect", text: "Connection accepted", date: "Mar 18, 10:00 AM" },
    ],
  },
  {
    id: 3, stage: "interested", name: "Marcus Chen", title: "CTO", company: "Notion",
    avatar: "MC", value: 25000, currency: "$", tags: ["Enterprise", "Decision Maker"],
    email: "marcus@notion.so", phone: "+1 929 555 0147", location: "New York, NY",
    source: "Tech CTOs Q2 2026", lastContact: "Mon",
    notes: [
      { id: 1, author: "Basar K.", text: "Forwarded to partnerships team. Need to follow up in 5 days.", date: "Apr 1, 2026", type: "note" },
    ],
    activity: [
      { id: 1, type: "message", text: "Replied — forwarding to partnerships", date: "Apr 1, 9:00 AM" },
      { id: 2, type: "connect", text: "Connection accepted", date: "Mar 30, 11:00 AM" },
    ],
  },
  {
    id: 4, stage: "connected", name: "James Rodriguez", title: "CTO", company: "Vercel",
    avatar: "JR", value: 18000, currency: "$", tags: ["Tech"],
    email: "james@vercel.com", phone: "+1 305 555 0199", location: "Miami, FL",
    source: "Tech CTOs Q2 2026", lastContact: "Mar 30",
    notes: [],
    activity: [
      { id: 1, type: "connect", text: "Connection accepted", date: "Mar 30, 1:00 PM" },
      { id: 2, type: "lead",    text: "Added to CRM from campaign", date: "Mar 29, 9:00 AM" },
    ],
  },
  {
    id: 5, stage: "lead", name: "Priya Patel", title: "Head of Growth", company: "Figma",
    avatar: "PP", value: 6000, currency: "$", tags: ["SMB"],
    email: "priya@figma.com", phone: "+1 512 555 0122", location: "Austin, TX",
    source: "SaaS Founders Outreach", lastContact: "Mar 17",
    notes: [],
    activity: [
      { id: 1, type: "lead", text: "Added to CRM from campaign", date: "Mar 17, 8:00 AM" },
    ],
  },
  {
    id: 6, stage: "lead", name: "Noah Brown", title: "VP of Sales", company: "HubSpot",
    avatar: "NB", value: 9500, currency: "$", tags: ["Warm"],
    email: "noah@hubspot.com", phone: "+1 617 555 0133", location: "Boston, MA",
    source: "SaaS Founders Outreach", lastContact: "Mar 21",
    notes: [],
    activity: [
      { id: 1, type: "lead", text: "Added to CRM from campaign", date: "Mar 21, 8:00 AM" },
    ],
  },
  {
    id: 7, stage: "connected", name: "Sarah Williams", title: "Director of HR", company: "Airbnb",
    avatar: "SW", value: 4000, currency: "$", tags: ["HR"],
    email: "sarah@airbnb.com", phone: "+1 206 555 0177", location: "Seattle, WA",
    source: "HR Directors Network", lastContact: "Feb 12",
    notes: [],
    activity: [
      { id: 1, type: "connect", text: "Connection request sent", date: "Feb 12, 9:00 AM" },
    ],
  },
  {
    id: 8, stage: "lost", name: "Emma Davis", title: "Founder", company: "Loom",
    avatar: "ED", value: 7000, currency: "$", tags: ["Cold"],
    email: "emma@loom.com", phone: "+1 312 555 0155", location: "Chicago, IL",
    source: "SaaS Founders Outreach", lastContact: "Mar 20",
    notes: [
      { id: 1, author: "Basar K.", text: "Not interested at this time. Follow up in Q3.", date: "Mar 22, 2026", type: "note" },
    ],
    activity: [
      { id: 1, type: "message", text: "Connection request rejected", date: "Mar 20, 3:00 PM" },
    ],
  },
];

const TAG_COLORS = {
  "Enterprise": "bg-violet-100 text-violet-700",
  "Hot":        "bg-red-100 text-red-600",
  "Warm":       "bg-amber-100 text-amber-700",
  "Cold":       "bg-slate-100 text-slate-600",
  "Startup":    "bg-blue-100 text-blue-700",
  "SMB":        "bg-cyan-100 text-cyan-700",
  "Tech":       "bg-indigo-100 text-indigo-700",
  "HR":         "bg-pink-100 text-pink-700",
  "Decision Maker": "bg-emerald-100 text-emerald-700",
};

// ─── Contacts & Companies Mock Data ──────────────────────────────────────────

const companies = [
  {
    id: 1, name: "Stripe", industry: "Fintech", size: "1,000–5,000", website: "stripe.com",
    location: "San Francisco, CA", revenue: "$1B+", logo: "S", logoColor: "bg-violet-600",
    contacts: [1], deals: 1, dealValue: 12000, status: "customer",
    description: "Global payment infrastructure for the internet.",
    founded: "2010", linkedin: "stripe",
    notes: [{ id: 1, author: "Basar K.", text: "Strong enterprise potential. Alice is the main champion.", date: "Apr 5, 2026" }],
  },
  {
    id: 2, name: "Notion", industry: "SaaS / Productivity", size: "200–500", website: "notion.so",
    location: "New York, NY", revenue: "$100M–$500M", logo: "N", logoColor: "bg-slate-800",
    contacts: [2], deals: 1, dealValue: 25000, status: "prospect",
    description: "All-in-one workspace for notes, docs, and collaboration.",
    founded: "2016", linkedin: "notionhq",
    notes: [],
  },
  {
    id: 3, name: "Linear", industry: "Dev Tools", size: "50–200", website: "linear.app",
    location: "Remote", revenue: "$10M–$50M", logo: "L", logoColor: "bg-indigo-600",
    contacts: [4], deals: 1, dealValue: 8500, status: "prospect",
    description: "Issue tracking tool built for high-performance teams.",
    founded: "2019", linkedin: "linear-app",
    notes: [{ id: 1, author: "Basar K.", text: "David very responsive. Strong fit for our platform.", date: "Apr 4, 2026" }],
  },
  {
    id: 4, name: "Figma", industry: "Design Tools", size: "500–1,000", website: "figma.com",
    location: "Austin, TX", revenue: "$500M–$1B", logo: "F", logoColor: "bg-pink-500",
    contacts: [3], deals: 1, dealValue: 6000, status: "cold",
    description: "Collaborative design and prototyping platform.",
    founded: "2012", linkedin: "figma",
    notes: [],
  },
  {
    id: 5, name: "Vercel", industry: "Dev Tools / Cloud", size: "200–500", website: "vercel.com",
    location: "Miami, FL", revenue: "$100M–$500M", logo: "V", logoColor: "bg-slate-900",
    contacts: [6], deals: 1, dealValue: 18000, status: "prospect",
    description: "Frontend cloud for deployment and DX tooling.",
    founded: "2015", linkedin: "vercel",
    notes: [],
  },
  {
    id: 6, name: "Airbnb", industry: "Travel / Marketplace", size: "5,000+", website: "airbnb.com",
    location: "Seattle, WA", revenue: "$1B+", logo: "A", logoColor: "bg-rose-500",
    contacts: [5], deals: 0, dealValue: 4000, status: "cold",
    description: "Online marketplace for short-term lodging and tourism.",
    founded: "2008", linkedin: "airbnb",
    notes: [],
  },
  {
    id: 7, name: "HubSpot", industry: "CRM / Marketing", size: "5,000+", website: "hubspot.com",
    location: "Boston, MA", revenue: "$1B+", logo: "H", logoColor: "bg-orange-500",
    contacts: [8], deals: 1, dealValue: 9500, status: "prospect",
    description: "CRM platform for marketing, sales, and customer service.",
    founded: "2006", linkedin: "hubspot",
    notes: [],
  },
  {
    id: 8, name: "Loom", industry: "Video / Comms", size: "200–500", website: "loom.com",
    location: "Chicago, IL", revenue: "$50M–$100M", logo: "L", logoColor: "bg-purple-600",
    contacts: [7], deals: 0, dealValue: 0, status: "lost",
    description: "Async video messaging for remote teams.",
    founded: "2015", linkedin: "loom-inc",
    notes: [{ id: 1, author: "Basar K.", text: "Not a fit right now. Revisit Q3 2026.", date: "Mar 22, 2026" }],
  },
];

const contacts = [
  {
    id: 1, name: "Alice Johnson", firstName: "Alice", lastName: "Johnson",
    title: "VP of Engineering", company: "Stripe", companyId: 1,
    avatar: "AJ", email: "alice@stripe.com", phone: "+1 415 555 0101",
    location: "San Francisco, CA", linkedin: "alicejohnson", twitter: "@alicejohnson",
    tags: ["Enterprise", "Hot", "Decision Maker"], status: "customer",
    campaign: "SaaS Founders Outreach", addedDate: "Mar 16, 2026",
    lastContact: "Today", dealValue: 12000, dealStage: "won",
    outreach: [
      { type: "connect",  text: "Connection request sent",         date: "Mar 16, 2026", time: "8:00 AM" },
      { type: "connect",  text: "Connection accepted",             date: "Mar 17, 2026", time: "9:15 AM" },
      { type: "message",  text: 'Sent: "Thanks for connecting…"', date: "Mar 17, 2026", time: "2:00 PM" },
      { type: "message",  text: "Replied to your message",        date: "Apr 5, 2026",  time: "10:32 AM" },
      { type: "note",     text: "Added note: Demo scheduled",     date: "Apr 5, 2026",  time: "11:00 AM" },
      { type: "meeting",  text: "Meeting booked for Tuesday",     date: "Apr 5, 2026",  time: "11:05 AM" },
    ],
    notes: [
      { id: 1, author: "Basar K.", text: "Agreed on a 30-min demo next Tuesday. Very interested in team collaboration features.", date: "Apr 5, 2026" },
      { id: 2, author: "Basar K.", text: "Sent follow-up deck with pricing tiers.", date: "Apr 3, 2026" },
    ],
    tasks: [
      { id: 1, text: "Send demo calendar invite", done: true, due: "Apr 5" },
      { id: 2, text: "Prepare custom demo for Stripe use case", done: false, due: "Apr 7" },
      { id: 3, text: "Follow up after demo", done: false, due: "Apr 10" },
    ],
  },
  {
    id: 2, name: "Marcus Chen", firstName: "Marcus", lastName: "Chen",
    title: "CTO", company: "Notion", companyId: 2,
    avatar: "MC", email: "marcus@notion.so", phone: "+1 929 555 0147",
    location: "New York, NY", linkedin: "marcuschen", twitter: "@mchen",
    tags: ["Enterprise", "Decision Maker"], status: "prospect",
    campaign: "Tech CTOs Q2 2026", addedDate: "Mar 29, 2026",
    lastContact: "Mon", dealValue: 25000, dealStage: "interested",
    outreach: [
      { type: "connect",  text: "Connection request sent",              date: "Mar 29, 2026", time: "9:00 AM" },
      { type: "connect",  text: "Connection accepted",                  date: "Mar 30, 2026", time: "11:00 AM" },
      { type: "message",  text: 'Sent: "Huge fan of Notion…"',         date: "Mar 30, 2026", time: "2:00 PM" },
      { type: "message",  text: "Replied: forwarding to partnerships", date: "Apr 1, 2026",  time: "9:00 AM" },
    ],
    notes: [
      { id: 1, author: "Basar K.", text: "Forwarded to partnerships team. Need to follow up in 5 days.", date: "Apr 1, 2026" },
    ],
    tasks: [
      { id: 1, text: "Follow up with partnerships contact", done: false, due: "Apr 8" },
    ],
  },
  {
    id: 3, name: "Priya Patel", firstName: "Priya", lastName: "Patel",
    title: "Head of Growth", company: "Figma", companyId: 4,
    avatar: "PP", email: "priya@figma.com", phone: "+1 512 555 0122",
    location: "Austin, TX", linkedin: "priyapatel", twitter: "@priya",
    tags: ["SMB", "Warm"], status: "prospect",
    campaign: "SaaS Founders Outreach", addedDate: "Mar 17, 2026",
    lastContact: "Mar 17", dealValue: 6000, dealStage: "lead",
    outreach: [
      { type: "connect", text: "Connection request sent", date: "Mar 17, 2026", time: "8:00 AM" },
    ],
    notes: [],
    tasks: [{ id: 1, text: "Send connection follow-up", done: false, due: "Apr 8" }],
  },
  {
    id: 4, name: "David Kim", firstName: "David", lastName: "Kim",
    title: "Co-Founder & CEO", company: "Linear", companyId: 3,
    avatar: "DK", email: "david@linear.app", phone: "+1 212 555 0188",
    location: "Remote", linkedin: "davidkim", twitter: "@davidk",
    tags: ["Startup", "Warm"], status: "prospect",
    campaign: "SaaS Founders Outreach", addedDate: "Mar 18, 2026",
    lastContact: "Yesterday", dealValue: 8500, dealStage: "meeting",
    outreach: [
      { type: "connect",  text: "Connection request sent",        date: "Mar 18, 2026", time: "9:00 AM" },
      { type: "connect",  text: "Connection accepted",            date: "Mar 18, 2026", time: "10:00 AM" },
      { type: "message",  text: 'Sent: "Huge fan of Linear…"',   date: "Mar 18, 2026", time: "2:00 PM" },
      { type: "message",  text: "Replied: free Thursday PM",     date: "Mar 19, 2026", time: "3:00 PM" },
      { type: "meeting",  text: "Meeting booked for Thursday",   date: "Apr 4, 2026",  time: "2:00 PM" },
    ],
    notes: [
      { id: 1, author: "Basar K.", text: "Call scheduled for Thursday 3pm. He wants API docs first.", date: "Apr 4, 2026" },
    ],
    tasks: [
      { id: 1, text: "Share API documentation", done: true, due: "Apr 5" },
      { id: 2, text: "Join Thursday 3pm call", done: false, due: "Apr 10" },
    ],
  },
  {
    id: 5, name: "Sarah Williams", firstName: "Sarah", lastName: "Williams",
    title: "Director of HR", company: "Airbnb", companyId: 6,
    avatar: "SW", email: "sarah@airbnb.com", phone: "+1 206 555 0177",
    location: "Seattle, WA", linkedin: "sarahwilliams", twitter: null,
    tags: ["HR", "Cold"], status: "cold",
    campaign: "HR Directors Network", addedDate: "Feb 12, 2026",
    lastContact: "Feb 12", dealValue: 4000, dealStage: "connected",
    outreach: [
      { type: "connect", text: "Connection request sent", date: "Feb 12, 2026", time: "9:00 AM" },
    ],
    notes: [],
    tasks: [],
  },
  {
    id: 6, name: "James Rodriguez", firstName: "James", lastName: "Rodriguez",
    title: "CTO", company: "Vercel", companyId: 5,
    avatar: "JR", email: "james@vercel.com", phone: "+1 305 555 0199",
    location: "Miami, FL", linkedin: "jamesrodriguez", twitter: "@jamesr",
    tags: ["Tech", "Warm"], status: "prospect",
    campaign: "Tech CTOs Q2 2026", addedDate: "Mar 30, 2026",
    lastContact: "Mar 30", dealValue: 18000, dealStage: "connected",
    outreach: [
      { type: "connect", text: "Connection request sent", date: "Mar 29, 2026", time: "9:00 AM" },
      { type: "connect", text: "Connection accepted",     date: "Mar 30, 2026", time: "1:00 PM" },
    ],
    notes: [],
    tasks: [{ id: 1, text: "Send intro message", done: false, due: "Apr 8" }],
  },
  {
    id: 7, name: "Emma Davis", firstName: "Emma", lastName: "Davis",
    title: "Founder", company: "Loom", companyId: 8,
    avatar: "ED", email: "emma@loom.com", phone: "+1 312 555 0155",
    location: "Chicago, IL", linkedin: "emmadavis", twitter: null,
    tags: ["Cold"], status: "lost",
    campaign: "SaaS Founders Outreach", addedDate: "Mar 20, 2026",
    lastContact: "Mar 20", dealValue: 0, dealStage: "lost",
    outreach: [
      { type: "connect", text: "Connection request sent",  date: "Mar 20, 2026", time: "8:00 AM" },
      { type: "connect", text: "Connection request rejected", date: "Mar 20, 2026", time: "3:00 PM" },
    ],
    notes: [{ id: 1, author: "Basar K.", text: "Not interested at this time. Follow up in Q3.", date: "Mar 22, 2026" }],
    tasks: [{ id: 1, text: "Re-engage in Q3 2026", done: false, due: "Jul 1" }],
  },
  {
    id: 8, name: "Noah Brown", firstName: "Noah", lastName: "Brown",
    title: "VP of Sales", company: "HubSpot", companyId: 7,
    avatar: "NB", email: "noah@hubspot.com", phone: "+1 617 555 0133",
    location: "Boston, MA", linkedin: "noahbrown", twitter: "@noahb",
    tags: ["Warm", "Enterprise"], status: "prospect",
    campaign: "SaaS Founders Outreach", addedDate: "Mar 21, 2026",
    lastContact: "Mar 21", dealValue: 9500, dealStage: "lead",
    outreach: [
      { type: "connect", text: "Connection request sent", date: "Mar 21, 2026", time: "8:00 AM" },
    ],
    notes: [],
    tasks: [{ id: 1, text: "Send connection request follow-up", done: false, due: "Apr 7" }],
  },
];

const CONTACT_STATUS_COLORS = {
  customer:  "bg-emerald-100 text-emerald-700",
  prospect:  "bg-blue-100 text-blue-700",
  cold:      "bg-slate-100 text-slate-500",
  lost:      "bg-red-100 text-red-500",
};

const COMPANY_STATUS_COLORS = {
  customer:  "bg-emerald-100 text-emerald-700",
  prospect:  "bg-blue-100 text-blue-700",
  cold:      "bg-slate-100 text-slate-500",
  lost:      "bg-red-100 text-red-500",
};

// ─── Color helpers ───────────────────────────────────────────────────────────
const statusColors = {
  active: "bg-emerald-100 text-emerald-700",
  paused: "bg-amber-100 text-amber-700",
  draft: "bg-slate-100 text-slate-600",
  replied: "bg-blue-100 text-blue-700",
  accepted: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  rejected: "bg-red-100 text-red-700",
};

const avatarColors = [
  "bg-violet-500", "bg-blue-500", "bg-emerald-500",
  "bg-pink-500", "bg-amber-500", "bg-cyan-500",
];
const avatarColor = (str) => avatarColors[str.charCodeAt(0) % avatarColors.length];

// ─── Gmail Mock Data ─────────────────────────────────────────────────────────

const gmailThreads = [
  {
    id: 1,
    from: { name: "Alice Johnson", email: "alice@stripe.com", avatar: "AJ" },
    to: "basar@openreach.io",
    subject: "Re: Quick question about your dev tooling stack",
    snippet: "Hi Basar, thanks for following up. I had a chance to review the deck you sent — it looks really compelling. Let's set up that demo.",
    date: "Today 10:15 AM", unread: true, starred: true, labels: ["Inbox"], hasAttachment: false,
    messages: [
      { id: 1, from: { name: "Basar K.", email: "basar@openreach.io" }, to: "alice@stripe.com", date: "Apr 3, 2026 9:00 AM", body: "Hi Alice,\n\nI came across your work at Stripe and was impressed by your team's infrastructure work. I'm reaching out because we've built a developer productivity platform helping teams like yours cut deployment time by 40%.\n\nWould you be open to a quick 15-minute call?\n\nBest,\nBasar" },
      { id: 2, from: { name: "Alice Johnson", email: "alice@stripe.com" }, to: "basar@openreach.io", date: "Apr 4, 2026 2:30 PM", body: "Hi Basar,\n\nThanks for reaching out! The platform sounds interesting. Could you send over some more details or a demo deck? I'd love to share it with our team.\n\nAlice" },
      { id: 3, from: { name: "Basar K.", email: "basar@openreach.io" }, to: "alice@stripe.com", date: "Apr 4, 2026 4:00 PM", body: "Hi Alice,\n\nGreat — attaching the deck now. Page 8 has the case study most relevant to Stripe's scale. Happy to set up a 30-min demo for you and the team anytime.\n\nBasar" },
      { id: 4, from: { name: "Alice Johnson", email: "alice@stripe.com" }, to: "basar@openreach.io", date: "Today 10:15 AM", body: "Hi Basar, thanks for following up. I had a chance to review the deck you sent — it looks really compelling. Let's set up that demo. Tuesday the 8th works for me between 2–4pm. Does that work?\n\nAlice" },
    ],
  },
  {
    id: 2,
    from: { name: "David Kim", email: "david@linear.app", avatar: "DK" },
    to: "basar@openreach.io",
    subject: "Re: Following up on our LinkedIn connection",
    snippet: "Sure, I took a look at the API docs. Very clean design. Can we move our Thursday call to 4pm instead of 3pm?",
    date: "Yesterday", unread: false, starred: false, labels: ["Inbox"], hasAttachment: false,
    messages: [
      { id: 1, from: { name: "Basar K.", email: "basar@openreach.io" }, to: "david@linear.app", date: "Apr 4, 2026 10:00 AM", body: "Hi David,\n\nWe connected on LinkedIn recently — I wanted to follow up via email. I'm working on a developer tools platform and I know Linear obsesses over developer experience the same way we do.\n\nHappy to share our API docs if useful?\n\nBasar" },
      { id: 2, from: { name: "David Kim", email: "david@linear.app" }, to: "basar@openreach.io", date: "Yesterday 3:45 PM", body: "Sure, I took a look at the API docs. Very clean design. Can we move our Thursday call to 4pm instead of 3pm?\n\nDavid" },
    ],
  },
  {
    id: 3,
    from: { name: "Marcus Chen", email: "marcus@notion.so", avatar: "MC" },
    to: "basar@openreach.io",
    subject: "Re: Partnerships inquiry — OpenReach",
    snippet: "Our partnerships team will be in touch shortly. They're reviewing your proposal now.",
    date: "Mon", unread: false, starred: true, labels: ["Inbox"], hasAttachment: false,
    messages: [
      { id: 1, from: { name: "Basar K.", email: "basar@openreach.io" }, to: "marcus@notion.so", date: "Apr 2, 2026 11:00 AM", body: "Hi Marcus,\n\nFollowing up on our LinkedIn conversation. I'd love to explore a formal partnership between OpenReach and Notion — our tools are highly complementary for sales teams using Notion as their workspace.\n\nHappy to set up a call with your partnerships team?\n\nBasar" },
      { id: 2, from: { name: "Marcus Chen", email: "marcus@notion.so" }, to: "basar@openreach.io", date: "Apr 3, 2026 9:00 AM", body: "Our partnerships team will be in touch shortly. They're reviewing your proposal now.\n\nMarcus" },
    ],
  },
  {
    id: 4,
    from: { name: "Google Calendar", email: "calendar-notification@google.com", avatar: "GC" },
    to: "basar@openreach.io",
    subject: "Invitation: Demo Call with Alice Johnson @ Apr 8, 2026 2:00 PM",
    snippet: "You have been invited to Demo Call with Alice Johnson. Location: Google Meet",
    date: "Today 10:20 AM", unread: true, starred: false, labels: ["Inbox"], hasAttachment: false,
    isCalendarInvite: true,
    messages: [
      { id: 1, from: { name: "Google Calendar", email: "calendar-notification@google.com" }, to: "basar@openreach.io", date: "Today 10:20 AM", body: "You have been invited to the following event.\n\nDemo Call with Alice Johnson\nWhen: Tuesday, April 8, 2026 · 2:00 – 3:00 PM\nWhere: Google Meet (meet.google.com/abc-defg-hij)\nOrganizer: alice@stripe.com\n\nGuests: alice@stripe.com, basar@openreach.io" },
    ],
  },
  {
    id: 5,
    from: { name: "Noah Brown", email: "noah@hubspot.com", avatar: "NB" },
    to: "basar@openreach.io",
    subject: "Re: Quick question about your dev tooling stack",
    snippet: "Hey Basar, I saw your message on LinkedIn. Happy to connect — what does your platform do exactly?",
    date: "Apr 3", unread: false, starred: false, labels: ["Inbox"], hasAttachment: false,
    messages: [
      { id: 1, from: { name: "Basar K.", email: "basar@openreach.io" }, to: "noah@hubspot.com", date: "Apr 2, 2026 9:00 AM", body: "Hi Noah,\n\nI noticed you recently transitioned to VP of Sales at HubSpot — congrats! I'd love to connect and share how OpenReach has helped sales leaders like you scale outbound without burning out their teams.\n\nWorth 15 minutes?\n\nBasar" },
      { id: 2, from: { name: "Noah Brown", email: "noah@hubspot.com" }, to: "basar@openreach.io", date: "Apr 3, 2026 4:15 PM", body: "Hey Basar, I saw your message on LinkedIn. Happy to connect — what does your platform do exactly? We're actually evaluating some outreach tools right now.\n\nNoah" },
    ],
  },
  {
    id: 6,
    from: { name: "Basar K.", email: "basar@openreach.io", avatar: "BK" },
    to: "james@vercel.com",
    subject: "Following up — OpenReach for Vercel",
    snippet: "Hi James, just circling back on my previous email. Would love to show you what we've built.",
    date: "Apr 2", unread: false, starred: false, labels: ["Sent"], hasAttachment: false,
    messages: [
      { id: 1, from: { name: "Basar K.", email: "basar@openreach.io" }, to: "james@vercel.com", date: "Apr 2, 2026 11:00 AM", body: "Hi James,\n\nJust circling back on my previous email. Would love to show you what we've built — I think it'd be a great fit for Vercel's sales motion.\n\nLet me know if you have 15 mins this week.\n\nBasar" },
    ],
  },
];

// ─── Calendar Mock Data ───────────────────────────────────────────────────────

const calendarEvents = [
  { id: 1, title: "Demo Call – Alice Johnson (Stripe)", date: "2026-04-08", startTime: "14:00", endTime: "15:00", type: "meeting", color: "bg-blue-500", attendees: ["basar@openreach.io", "alice@stripe.com"], location: "Google Meet", googleMeet: "meet.google.com/abc-defg-hij", description: "Product demo for Stripe engineering team. Focus on team collaboration and CI/CD integrations." },
  { id: 2, title: "Call – David Kim (Linear)", date: "2026-04-10", startTime: "16:00", endTime: "16:30", type: "call", color: "bg-violet-500", attendees: ["basar@openreach.io", "david@linear.app"], location: "Google Meet", googleMeet: "meet.google.com/xyz-uvwx-yz", description: "Intro call with David. He's reviewed API docs — focus on integration capabilities." },
  { id: 3, title: "Team Standup", date: "2026-04-07", startTime: "09:00", endTime: "09:15", type: "internal", color: "bg-emerald-500", attendees: ["basar@openreach.io", "team@openreach.io"], location: "Google Meet", googleMeet: "meet.google.com/team-standup", description: "Daily team standup.", recurring: "Daily (Mon–Fri)" },
  { id: 4, title: "Team Standup", date: "2026-04-08", startTime: "09:00", endTime: "09:15", type: "internal", color: "bg-emerald-500", attendees: ["basar@openreach.io", "team@openreach.io"], location: "Google Meet", googleMeet: "meet.google.com/team-standup", description: "Daily team standup.", recurring: "Daily (Mon–Fri)" },
  { id: 5, title: "Team Standup", date: "2026-04-09", startTime: "09:00", endTime: "09:15", type: "internal", color: "bg-emerald-500", attendees: ["basar@openreach.io", "team@openreach.io"], location: "Google Meet", googleMeet: "meet.google.com/team-standup", description: "Daily team standup.", recurring: "Daily (Mon–Fri)" },
  { id: 6, title: "Q2 Pipeline Review", date: "2026-04-09", startTime: "14:00", endTime: "15:00", type: "internal", color: "bg-amber-500", attendees: ["basar@openreach.io", "sales@openreach.io"], location: "Google Meet", googleMeet: "meet.google.com/pipeline-q2", description: "Review Q2 pipeline, top opportunities, and forecast." },
  { id: 7, title: "Notion Partnerships Call", date: "2026-04-14", startTime: "11:00", endTime: "11:30", type: "meeting", color: "bg-blue-500", attendees: ["basar@openreach.io", "partnerships@notion.so"], location: "Google Meet", googleMeet: "meet.google.com/notion-partner", description: "First call with Notion's partnerships team. Intro and mutual fit discussion." },
  { id: 8, title: "LinkedIn Outreach Webinar", date: "2026-04-15", startTime: "15:00", endTime: "16:30", type: "webinar", color: "bg-pink-500", attendees: ["basar@openreach.io"], location: "Zoom", description: "External webinar: Advanced LinkedIn automation strategies." },
  { id: 9, title: "Team Standup", date: "2026-04-14", startTime: "09:00", endTime: "09:15", type: "internal", color: "bg-emerald-500", attendees: ["basar@openreach.io", "team@openreach.io"], location: "Google Meet", googleMeet: "meet.google.com/team-standup", description: "Daily team standup." },
  { id: 10, title: "Product Planning – Q2 Roadmap", date: "2026-04-06", startTime: "13:00", endTime: "14:30", type: "internal", color: "bg-amber-500", attendees: ["basar@openreach.io", "product@openreach.io", "eng@openreach.io"], location: "Google Meet", googleMeet: "meet.google.com/roadmap-q2", description: "Q2 product roadmap review and prioritization." },
  { id: 11, title: "Team Standup", date: "2026-04-06", startTime: "09:00", endTime: "09:15", type: "internal", color: "bg-emerald-500", attendees: ["basar@openreach.io", "team@openreach.io"], location: "Google Meet", googleMeet: "meet.google.com/team-standup", description: "Daily team standup.", recurring: "Daily (Mon–Fri)" },
  { id: 12, title: "Follow-up: Noah Brown (HubSpot)", date: "2026-04-13", startTime: "15:00", endTime: "15:30", type: "call", color: "bg-violet-500", attendees: ["basar@openreach.io", "noah@hubspot.com"], location: "Google Meet", googleMeet: "meet.google.com/noah-hubspot", description: "Discovery call with Noah. He's evaluating outreach tools." },
];

// ─── Sidebar ─────────────────────────────────────────────────────────────────
const navItems = [
  { id: "dashboard",  label: "Dashboard",  icon: LayoutDashboard },
  { id: "campaigns",  label: "Campaigns",  icon: Zap },
  { id: "leads",      label: "Leads",      icon: Users },
  { id: "contacts",   label: "Contacts",   icon: UsersRound },
  { id: "companies",  label: "Companies",  icon: Building2 },
  { id: "crm",        label: "CRM",        icon: Briefcase },
  { id: "inbox",      label: "Inbox",      icon: Inbox, badge: 4 },
  { id: "calendar",   label: "Calendar",   icon: CalendarDays },
  { id: "analytics",  label: "Analytics",  icon: BarChart2 },
  { id: "settings",   label: "Settings",   icon: Settings },
];

// ─── Auth Helpers ────────────────────────────────────────────────────────────

const AUTH_KEY = "openreach_auth";

function saveSession(user) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}
function loadSession() {
  try { return JSON.parse(localStorage.getItem(AUTH_KEY)); } catch { return null; }
}
function clearSession() {
  localStorage.removeItem(AUTH_KEY);
}

// ─── Login Page ──────────────────────────────────────────────────────────────

function LoginPage({ onLogin, onGoSignup, onGoForgot }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    setTimeout(() => {
      const stored = JSON.parse(localStorage.getItem("openreach_users") || "[]");
      const user = stored.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
      if (user) {
        const session = { name: user.name, email: user.email, plan: "Pro", avatar: user.name[0].toUpperCase() };
        saveSession(session);
        onLogin(session);
      } else {
        setError("Invalid email or password.");
        setLoading(false);
      }
    }, 700);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
            <Zap size={20} className="text-white" />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">OpenReach</span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-1">Welcome back</h2>
          <p className="text-slate-500 text-sm mb-6">Sign in to your account</p>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 mb-5 text-sm">
              <AlertCircle size={15} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com" autoFocus
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <button type="button" onClick={onGoForgot} className="text-xs text-blue-600 hover:underline">Forgot password?</button>
              </div>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <Eye size={15} />
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
              {loading ? <><RefreshCw size={15} className="animate-spin" /> Signing in…</> : "Sign in"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{" "}
            <button onClick={onGoSignup} className="text-blue-600 font-medium hover:underline">Create one free</button>
          </p>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          © {new Date().getFullYear()} OpenReach · <a href="#" className="hover:underline">Privacy</a> · <a href="#" className="hover:underline">Terms</a>
        </p>
      </div>
    </div>
  );
}

// ─── Signup Page ─────────────────────────────────────────────────────────────

function SignupPage({ onLogin, onGoLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!name || !email || !password || !confirm) { setError("Please fill in all fields."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }
    setLoading(true);
    setTimeout(() => {
      const stored = JSON.parse(localStorage.getItem("openreach_users") || "[]");
      if (stored.find(u => u.email.toLowerCase() === email.toLowerCase())) {
        setError("An account with this email already exists.");
        setLoading(false);
        return;
      }
      stored.push({ name, email, password });
      localStorage.setItem("openreach_users", JSON.stringify(stored));
      const session = { name, email, plan: "Pro Trial", avatar: name[0].toUpperCase() };
      saveSession(session);
      onLogin(session);
    }, 700);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
            <Zap size={20} className="text-white" />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">OpenReach</span>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-1">Create your account</h2>
          <p className="text-slate-500 text-sm mb-6">Start your free trial — no credit card required</p>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 mb-5 text-sm">
              <AlertCircle size={15} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)}
                placeholder="Basar Kucuk" autoFocus
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Work email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <div className="relative">
                <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <Eye size={15} />
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Confirm password</label>
              <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
              {loading ? <><RefreshCw size={15} className="animate-spin" /> Creating account…</> : "Create free account"}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-4">
            By signing up you agree to our <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy Policy</a>.
          </p>
          <p className="text-center text-sm text-slate-500 mt-3">
            Already have an account?{" "}
            <button onClick={onGoLogin} className="text-blue-600 font-medium hover:underline">Sign in</button>
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Forgot Password Page ─────────────────────────────────────────────────────

function ForgotPasswordPage({ onGoLogin }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => { setSent(true); setLoading(false); }, 800);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
            <Zap size={20} className="text-white" />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">OpenReach</span>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {sent ? (
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={28} className="text-green-500" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Check your inbox</h2>
              <p className="text-slate-500 text-sm mb-6">We sent a reset link to <strong>{email}</strong>. Check your spam folder if you don't see it.</p>
              <button onClick={onGoLogin} className="text-blue-600 font-medium hover:underline text-sm">← Back to sign in</button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">Reset password</h2>
              <p className="text-slate-500 text-sm mb-6">Enter your email and we'll send you a reset link.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="you@company.com" autoFocus
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
                  {loading ? <><RefreshCw size={15} className="animate-spin" /> Sending…</> : "Send reset link"}
                </button>
              </form>
              <p className="text-center mt-4">
                <button onClick={onGoLogin} className="text-sm text-blue-600 hover:underline">← Back to sign in</button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function Sidebar({ current, onChange, collapsed, setCollapsed, user, onLogout }) {
  return (
    <div className={`flex flex-col bg-slate-900 text-white transition-all duration-200 ${collapsed ? "w-16" : "w-60"} min-h-screen flex-shrink-0`}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-800">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center flex-shrink-0">
          <Zap size={16} className="text-white" />
        </div>
        {!collapsed && <span className="font-bold text-lg tracking-tight">OpenReach</span>}
        <button onClick={() => setCollapsed(!collapsed)} className="ml-auto text-slate-400 hover:text-white">
          {collapsed ? <Menu size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-1 px-2">
        {navItems.map(({ id, label, icon: Icon, badge }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative
              ${current === id ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
          >
            <Icon size={18} className="flex-shrink-0" />
            {!collapsed && <span>{label}</span>}
            {badge && !collapsed && (
              <span className="ml-auto bg-blue-500 text-white text-xs rounded-full px-1.5 py-0.5">{badge}</span>
            )}
            {badge && collapsed && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
            )}
          </button>
        ))}
      </nav>

      {/* User */}
      <div className="p-3 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-xs font-bold flex-shrink-0">
            {user?.avatar || "?"}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name || "User"}</p>
              <p className="text-xs text-slate-400 truncate">{user?.plan || "Free"}</p>
            </div>
          )}
          {!collapsed && (
            <button onClick={onLogout} title="Sign out"
              className="text-slate-400 hover:text-white cursor-pointer flex-shrink-0 transition-colors">
              <LogOut size={15} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Topbar ──────────────────────────────────────────────────────────────────
function Topbar({ title, subtitle }) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
      <div>
        <h1 className="text-xl font-bold text-slate-900">{title}</h1>
        {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input placeholder="Search..." className="pl-9 pr-4 py-2 text-sm bg-slate-100 rounded-lg border-0 outline-none focus:ring-2 focus:ring-blue-500 w-56" />
        </div>
        <button className="relative p-2 rounded-lg hover:bg-slate-100">
          <Bell size={18} className="text-slate-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
      </div>
    </div>
  );
}

// ─── Stat Card ───────────────────────────────────────────────────────────────
function StatCard({ label, value, change, icon: Icon, color }) {
  const positive = change >= 0;
  return (
    <div className="bg-white rounded-xl border border-slate-100 p-5 flex items-start gap-4 shadow-sm">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-slate-500">{label}</p>
        <p className="text-2xl font-bold text-slate-900 mt-0.5">{value}</p>
        <p className={`text-xs mt-1 ${positive ? "text-emerald-600" : "text-red-500"}`}>
          {positive ? "+" : ""}{change}% vs last week
        </p>
      </div>
    </div>
  );
}

// ─── Dashboard Page ──────────────────────────────────────────────────────────
function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Invites Sent" value="1,247" change={12} icon={UserPlus} color="bg-blue-500" />
        <StatCard label="Accepted" value="489" change={8} icon={CheckCircle} color="bg-emerald-500" />
        <StatCard label="Replies" value="183" change={21} icon={MessageSquare} color="bg-violet-500" />
        <StatCard label="Active Campaigns" value="3" change={0} icon={Zap} color="bg-amber-500" />
      </div>

      {/* Chart + Recent */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-900">Weekly Activity</h2>
            <select className="text-xs text-slate-500 bg-slate-100 rounded-lg px-2 py-1 border-0 outline-none">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={analyticsData}>
              <defs>
                <linearGradient id="sent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="accepted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="sent" stroke="#3b82f6" fill="url(#sent)" strokeWidth={2} />
              <Area type="monotone" dataKey="accepted" stroke="#10b981" fill="url(#accepted)" strokeWidth={2} />
              <Area type="monotone" dataKey="replied" stroke="#8b5cf6" strokeWidth={2} fill="none" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
          <h2 className="font-semibold text-slate-900 mb-4">Top Campaigns</h2>
          <div className="space-y-4">
            {campaigns.filter(c => c.status === "active").map(c => (
              <div key={c.id}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-700 font-medium truncate pr-2">{c.name}</span>
                  <span className="text-slate-500 flex-shrink-0">{c.acceptRate}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full">
                  <div className="h-2 bg-blue-500 rounded-full" style={{ width: `${c.acceptRate}%` }} />
                </div>
              </div>
            ))}
          </div>

          <h2 className="font-semibold text-slate-900 mt-6 mb-3">Recent Replies</h2>
          <div className="space-y-3">
            {conversations.slice(0, 2).map(c => (
              <div key={c.id} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full ${avatarColor(c.avatar)} flex items-center justify-center text-xs text-white font-bold flex-shrink-0`}>
                  {c.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{c.name}</p>
                  <p className="text-xs text-slate-400 truncate">{c.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Campaign Builder ─────────────────────────────────────────────────────────
// Each entry can carry an optional `group` for the add-step menu header.
const LI_STEP_TYPES = [
  // ── Outreach ──────────────────────────────────────────────────────────────
  { type: "connect",  label: "Send Connection",   icon: UserPlus,      color: "bg-blue-500",    group: "LinkedIn Outreach",  desc: "Send a personalised connection request" },
  { type: "message",  label: "Send Message",      icon: MessageSquare, color: "bg-violet-500",  group: "LinkedIn Outreach",  desc: "Send a direct LinkedIn message" },
  { type: "inmail",   label: "Send InMail",       icon: Mail,          color: "bg-blue-700",    group: "LinkedIn Outreach",  desc: "Premium InMail for 2nd/3rd-degree connections" },
  { type: "voice",    label: "Voice Message",     icon: Mic,           color: "bg-purple-500",  group: "LinkedIn Outreach",  desc: "Record & send a LinkedIn voice message" },
  // ── Engagement ────────────────────────────────────────────────────────────
  { type: "view",     label: "View Profile",      icon: Eye,           color: "bg-cyan-500",    group: "LinkedIn Engagement", desc: "Visit their profile (shows up in notifications)" },
  { type: "follow",   label: "Follow",            icon: Star,          color: "bg-pink-500",    group: "LinkedIn Engagement", desc: "Follow the person on LinkedIn" },
  { type: "endorse",  label: "Endorse Skills",    icon: Award,         color: "bg-emerald-500", group: "LinkedIn Engagement", desc: "Endorse one or more of their skills" },
  { type: "like",     label: "Like a Post",       icon: ThumbsUp,      color: "bg-rose-500",    group: "LinkedIn Engagement", desc: "Like one of their recent posts" },
  { type: "comment",  label: "Comment on Post",   icon: MessageCircle, color: "bg-orange-500",  group: "LinkedIn Engagement", desc: "Leave a comment on a recent post" },
  // ── Timing & Flow ─────────────────────────────────────────────────────────
  { type: "wait",     label: "Wait",              icon: Clock,         color: "bg-amber-500",   group: "Timing & Flow",      desc: "Pause before the next step" },
  // ── Workflow ──────────────────────────────────────────────────────────────
  { type: "tag",      label: "Tag Contact",       icon: Tag,           color: "bg-teal-500",    group: "Workflow",            desc: "Apply a tag when this step is reached" },
  { type: "movestage",label: "Move Deal Stage",   icon: MoveRight,     color: "bg-indigo-500",  group: "Workflow",            desc: "Advance the contact's CRM pipeline stage" },
  { type: "webhook",  label: "Webhook / API",     icon: Link2,         color: "bg-slate-600",   group: "Workflow",            desc: "Fire an HTTP request to any external tool" },
  { type: "task",     label: "Manual Task",       icon: CheckSquare,   color: "bg-slate-500",   group: "Workflow",            desc: "Create a reminder task for yourself" },
];

const EMAIL_STEP_TYPES = [
  // ── Email Actions ─────────────────────────────────────────────────────────
  { type: "email",     label: "Send Email",        icon: Mail,          color: "bg-blue-500",   group: "Email Actions",  desc: "Send a personalised email" },
  { type: "followup",  label: "Follow-Up Email",   icon: RefreshCw,     color: "bg-violet-500", group: "Email Actions",  desc: "Auto follow-up if no reply" },
  { type: "abtest",    label: "A/B Test",          icon: FlaskConical,  color: "bg-orange-500", group: "Email Actions",  desc: "Split-test two subject lines or bodies" },
  // ── Timing & Logic ────────────────────────────────────────────────────────
  { type: "wait",      label: "Wait",              icon: Clock,         color: "bg-amber-500",  group: "Timing & Logic", desc: "Pause before next step" },
  { type: "condition", label: "If / Condition",    icon: GitBranch,     color: "bg-indigo-500", group: "Timing & Logic", desc: "Branch on open / click / reply" },
  // ── Workflow ──────────────────────────────────────────────────────────────
  { type: "tag",       label: "Tag Contact",       icon: Tag,           color: "bg-teal-500",   group: "Workflow",       desc: "Apply a tag at this point in the sequence" },
  { type: "movestage", label: "Move Deal Stage",   icon: MoveRight,     color: "bg-indigo-600", group: "Workflow",       desc: "Advance the contact's CRM stage" },
  { type: "webhook",   label: "Webhook / API",     icon: Link2,         color: "bg-slate-600",  group: "Workflow",       desc: "POST to HubSpot, Zapier, Slack, etc." },
  { type: "task",      label: "Manual Task",       icon: CheckSquare,   color: "bg-slate-500",  group: "Workflow",       desc: "Create a manual to-do for yourself" },
];

const MULTI_STEP_TYPES = [
  // ── LinkedIn ──────────────────────────────────────────────────────────────
  { type: "connect",   label: "LinkedIn Connect",  icon: UserPlus,      color: "bg-blue-500",   group: "LinkedIn",       desc: "Send connection request" },
  { type: "message",   label: "LinkedIn Message",  icon: MessageSquare, color: "bg-violet-500", group: "LinkedIn",       desc: "Send LinkedIn message" },
  { type: "inmail",    label: "Send InMail",       icon: Mail,          color: "bg-blue-700",   group: "LinkedIn",       desc: "Premium InMail message" },
  { type: "voice",     label: "Voice Message",     icon: Mic,           color: "bg-purple-500", group: "LinkedIn",       desc: "LinkedIn voice message" },
  { type: "view",      label: "View Profile",      icon: Eye,           color: "bg-cyan-500",   group: "LinkedIn",       desc: "View their profile" },
  { type: "endorse",   label: "Endorse Skills",    icon: Award,         color: "bg-emerald-500",group: "LinkedIn",       desc: "Endorse their skills" },
  { type: "like",      label: "Like a Post",       icon: ThumbsUp,      color: "bg-rose-500",   group: "LinkedIn",       desc: "Like a recent post" },
  { type: "comment",   label: "Comment on Post",   icon: MessageCircle, color: "bg-orange-500", group: "LinkedIn",       desc: "Comment on a recent post" },
  // ── Email ─────────────────────────────────────────────────────────────────
  { type: "email",     label: "Send Email",        icon: Mail,          color: "bg-pink-500",   group: "Email",          desc: "Send personalised email" },
  { type: "followup",  label: "Follow-Up Email",   icon: RefreshCw,     color: "bg-indigo-500", group: "Email",          desc: "Email if no reply" },
  { type: "abtest",    label: "A/B Test",          icon: FlaskConical,  color: "bg-orange-400", group: "Email",          desc: "Split-test subject / body" },
  // ── Timing & Flow ─────────────────────────────────────────────────────────
  { type: "wait",      label: "Wait",              icon: Clock,         color: "bg-amber-500",  group: "Timing & Flow",  desc: "Wait before next step" },
  { type: "condition", label: "If / Condition",    icon: GitBranch,     color: "bg-indigo-400", group: "Timing & Flow",  desc: "Branch on any event" },
  // ── Workflow ──────────────────────────────────────────────────────────────
  { type: "tag",       label: "Tag Contact",       icon: Tag,           color: "bg-teal-500",   group: "Workflow",       desc: "Apply a tag" },
  { type: "movestage", label: "Move Deal Stage",   icon: MoveRight,     color: "bg-indigo-600", group: "Workflow",       desc: "Advance CRM stage" },
  { type: "webhook",   label: "Webhook / API",     icon: Link2,         color: "bg-slate-600",  group: "Workflow",       desc: "Fire an HTTP request" },
  { type: "task",      label: "Manual Task",       icon: CheckSquare,   color: "bg-slate-500",  group: "Workflow",       desc: "Create a task" },
];

const defaultLISequence = [
  { id: 1, type: "connect",  note: "Hi {{first_name}}, I noticed your work at {{company}} and would love to connect!", delay: 0 },
  { id: 2, type: "wait",     delay: 2, unit: "days" },
  { id: 3, type: "message",  note: "Thanks for connecting, {{first_name}}! I'd love to learn more about your work on {{title}}." },
  { id: 4, type: "wait",     delay: 3, unit: "days" },
  { id: 5, type: "message",  note: "Hey {{first_name}}, just following up — would love to jump on a quick 15-min call!" },
];

const defaultEmailSequence = [
  { id: 1, type: "email",    subject: "Quick question about {{company}}", note: "Hi {{first_name}},\n\nI came across your work at {{company}} and was impressed by what you're building...", delay: 0 },
  { id: 2, type: "wait",     delay: 3, unit: "days" },
  { id: 3, type: "followup", subject: "Re: Quick question about {{company}}", note: "Hi {{first_name}}, just bumping this up in case it got buried...", delay: 0 },
  { id: 4, type: "wait",     delay: 4, unit: "days" },
  { id: 5, type: "followup", subject: "Last note from me", note: "Hi {{first_name}}, I'll keep this brief — still worth a chat?", delay: 0 },
];

// Helper: get step types by channel
const stepTypesFor = (ch) => ch === "email" ? EMAIL_STEP_TYPES : ch === "multichannel" ? MULTI_STEP_TYPES : LI_STEP_TYPES;
const defaultSeqFor = (ch) => ch === "email" || ch === "multichannel" ? defaultEmailSequence.map(s => ({...s})) : defaultLISequence.map(s => ({...s}));

// Preview line shown inside each step card, keyed by type
function StepPreview({ step }) {
  switch (step.type) {
    case "wait":      return <p className="text-xs text-slate-400 mt-1">⏱ Wait {step.delay || 1} {step.unit || "days"}</p>;
    case "condition": return <p className="text-xs text-indigo-500 mt-1">⚡ {step.condition || "If email opened / clicked / replied"}</p>;
    case "abtest":    return <p className="text-xs text-orange-500 mt-1">🧪 A: "{step.subjectA || "—"}" · B: "{step.subjectB || "—"}"</p>;
    case "tag":       return <p className="text-xs text-teal-600 mt-1">🏷 Tag: <strong>{step.tagName || "choose tag"}</strong></p>;
    case "movestage": return <p className="text-xs text-indigo-600 mt-1">➡ Move to: <strong>{step.stageName || "choose stage"}</strong></p>;
    case "webhook":   return <p className="text-xs text-slate-500 mt-1 truncate">🔗 {step.webhookUrl || "https://hooks.example.com/..."}</p>;
    case "task":      return step.note ? <p className="text-xs text-slate-400 mt-1 truncate">📋 {step.note}</p> : null;
    case "inmail":    return step.subject ? <p className="text-xs text-slate-500 mt-0.5 truncate">Subject: {step.subject}</p> : <p className="text-xs text-slate-400 mt-0.5">Add subject & body</p>;
    case "voice":     return <p className="text-xs text-purple-500 mt-1">🎙 {step.note || "Record a personal voice message"}</p>;
    case "endorse":   return <p className="text-xs text-emerald-600 mt-1">⭐ Skills: {step.skills || "Auto-select top skills"}</p>;
    case "like":      return <p className="text-xs text-rose-500 mt-1">👍 Like their most recent LinkedIn post</p>;
    case "comment":   return step.note ? <p className="text-xs text-orange-500 mt-1 truncate">💬 "{step.note}"</p> : <p className="text-xs text-slate-400 mt-1">Add your comment text</p>;
    case "email":
    case "followup":
      return (
        <div className="mt-1 space-y-0.5">
          {step.subject && <p className="text-xs font-medium text-slate-600 truncate">Subject: {step.subject}</p>}
          {step.note && <p className="text-xs text-slate-400 truncate">{step.note}</p>}
        </div>
      );
    default:
      return step.note ? <p className="text-xs text-slate-400 mt-1 truncate">{step.note}</p> : null;
  }
}

function SequenceStep({ step, channel, onEdit, onDelete, isLast }) {
  const pool = stepTypesFor(channel);
  // look up in ALL pools as fallback (for multichannel viewing linkedin steps etc.)
  const def  = pool.find(s => s.type === step.type)
            || LI_STEP_TYPES.find(s => s.type === step.type)
            || EMAIL_STEP_TYPES.find(s => s.type === step.type)
            || pool[0];
  const Icon = def.icon;
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white border border-slate-200 rounded-xl p-4 w-full flex items-start gap-3 shadow-sm hover:border-blue-300 transition-colors group">
        <div className={`p-2 rounded-lg ${def.color} flex-shrink-0`}>
          <Icon size={16} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm text-slate-800">{def.label}</p>
            {def.group && (
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-400 hidden group-hover:inline-block">{def.group}</span>
            )}
          </div>
          <StepPreview step={step} />
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onEdit(step)} className="p-1 rounded hover:bg-slate-100 text-slate-400"><Edit3 size={13} /></button>
          <button onClick={() => onDelete(step.id)} className="p-1 rounded hover:bg-red-50 text-slate-400 hover:text-red-500"><Trash2 size={13} /></button>
        </div>
      </div>
      {!isLast && (
        <div className="flex flex-col items-center py-1">
          <div className="w-0.5 h-6 bg-slate-200" />
          <ArrowRight size={14} className="text-slate-300 rotate-90" />
        </div>
      )}
    </div>
  );
}

// ── Inline toggle helper ────────────────────────────────────────────────────
function Toggle({ checked, onChange }) {
  return (
    <button onClick={() => onChange(!checked)} className={`relative w-10 h-5 rounded-full transition-colors ${checked ? "bg-blue-500" : "bg-slate-300"}`}>
      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${checked ? "left-5" : "left-0.5"}`} />
    </button>
  );
}

function CampaignBuilder({ campaign, onBack }) {
  const initChannel = campaign?.channel || "linkedin";
  const [channel, setChannel]     = useState(initChannel);
  const [sequence, setSequence]   = useState(() => defaultSeqFor(initChannel));
  const [editingStep, setEditingStep] = useState(null);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [stopOnReply, setStopOnReply] = useState(true);
  const [trackOpens, setTrackOpens]   = useState(true);
  const [trackClicks, setTrackClicks] = useState(true);
  const [showTemplates, setShowTemplates] = useState(false);

  const switchChannel = (ch) => { setChannel(ch); setSequence(defaultSeqFor(ch)); };

  const addStep = (type) => {
    const newStep = { id: Date.now(), type, note: "", subject: "", delay: 1, unit: "days" };
    setSequence(s => [...s, newStep]);
    setShowAddMenu(false);
  };
  const deleteStep = (id) => setSequence(s => s.filter(x => x.id !== id));

  const CHANNEL_TABS = [
    { id: "linkedin",     label: "LinkedIn",      icon: "💼", color: "text-blue-600 bg-blue-50 border-blue-200" },
    { id: "email",        label: "Email",         icon: "✉️", color: "text-rose-600 bg-rose-50 border-rose-200" },
    { id: "multichannel", label: "Multi-channel", icon: "⚡", color: "text-violet-600 bg-violet-50 border-violet-200" },
  ];

  const isEmail = channel === "email" || channel === "multichannel";

  return (
    <div className="flex h-full overflow-hidden">
      {/* Canvas */}
      <div className="flex-1 p-6 overflow-y-auto bg-slate-50/50">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <button onClick={onBack} className="p-2 rounded-lg hover:bg-white border border-transparent hover:border-slate-200 text-slate-600"><ChevronLeft size={18} /></button>
          <div>
            <h2 className="font-bold text-slate-900">{campaign?.name || "New Campaign"}</h2>
            <p className="text-xs text-slate-400 mt-0.5">Sequence builder · {sequence.length} steps</p>
          </div>
          <div className="ml-auto flex gap-2">
            <button className="px-3 py-2 text-sm text-slate-600 border border-slate-200 bg-white rounded-lg hover:bg-slate-50">Save Draft</button>
            <button className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"><Play size={14} /> Launch</button>
          </div>
        </div>

        {/* Channel selector */}
        <div className="flex gap-2 mb-5 bg-white border border-slate-200 rounded-xl p-1.5 w-fit">
          {CHANNEL_TABS.map(t => (
            <button key={t.id} onClick={() => switchChannel(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${channel === t.id ? t.color : "text-slate-500 border-transparent hover:bg-slate-50"}`}>
              <span>{t.icon}</span>{t.label}
            </button>
          ))}
        </div>

        {/* Sequence */}
        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-r from-blue-50 to-violet-50 border border-blue-200 rounded-xl p-4 mb-2 text-center">
            <p className="text-sm font-semibold text-blue-700">🚀 Campaign Start</p>
            <p className="text-xs text-slate-500 mt-0.5">Leads enter when added to this campaign</p>
          </div>
          <div className="flex flex-col items-center py-1"><div className="w-0.5 h-6 bg-slate-200" /></div>

          {sequence.map((step, i) => (
            <SequenceStep key={step.id} step={step} channel={channel}
              onEdit={setEditingStep} onDelete={deleteStep}
              isLast={i === sequence.length - 1} />
          ))}

          {/* Add step */}
          <div className="mt-3 relative">
            <button onClick={() => setShowAddMenu(!showAddMenu)}
              className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-sm text-slate-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
              <Plus size={16} /> Add Step
            </button>
            {showAddMenu && (() => {
              const allSteps = stepTypesFor(channel);
              // build ordered groups preserving first-seen order
              const groups = [];
              const seen = {};
              allSteps.forEach(s => {
                const g = s.group || "Other";
                if (!seen[g]) { seen[g] = true; groups.push(g); }
              });
              return (
                <div className="absolute z-20 w-72 mt-2 bg-white border border-slate-200 rounded-xl shadow-2xl py-2 max-h-[480px] overflow-y-auto left-1/2 -translate-x-1/2">
                  {groups.map(g => (
                    <div key={g}>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 pt-3 pb-1.5">{g}</p>
                      {allSteps.filter(s => (s.group || "Other") === g).map(s => {
                        const Icon = s.icon;
                        return (
                          <button key={s.type} onClick={() => addStep(s.type)}
                            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-50 text-left">
                            <div className={`p-1.5 rounded-lg ${s.color} flex-shrink-0`}><Icon size={13} className="text-white" /></div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-slate-800">{s.label}</p>
                              <p className="text-xs text-slate-400 truncate">{s.desc}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>

          {/* End */}
          <div className="flex flex-col items-center py-1"><div className="w-0.5 h-6 bg-slate-200" /></div>
          <div className="bg-slate-100 border border-slate-200 rounded-xl p-3 text-center">
            <p className="text-xs font-medium text-slate-500">🏁 Campaign End</p>
          </div>
        </div>
      </div>

      {/* Settings panel */}
      <div className="w-72 border-l border-slate-100 p-5 bg-white overflow-y-auto">
        <h3 className="font-semibold text-slate-800 mb-4">Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-slate-600 block mb-1">Campaign Name</label>
            <input defaultValue={campaign?.name || "New Campaign"} className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          {/* Email-only settings */}
          {isEmail && (
            <>
              <div className="pt-1 border-t border-slate-100">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Email Settings</p>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-slate-600 block mb-1">From Name</label>
                    <input defaultValue="Basar K." className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600 block mb-1">From Email</label>
                    <input defaultValue="basar@openreach.io" className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600 block mb-1">Reply-To</label>
                    <input defaultValue="basar@openreach.io" className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-700">Track Opens</p>
                      <p className="text-xs text-slate-400">Add tracking pixel</p>
                    </div>
                    <Toggle checked={trackOpens} onChange={setTrackOpens} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-700">Track Clicks</p>
                      <p className="text-xs text-slate-400">Wrap links</p>
                    </div>
                    <Toggle checked={trackClicks} onChange={setTrackClicks} />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* LinkedIn-only settings */}
          {channel === "linkedin" && (
            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">Daily Limit</label>
              <input type="number" defaultValue={50} className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500" />
              <p className="text-xs text-slate-400 mt-1">Max invites/messages per day</p>
            </div>
          )}

          <div>
            <label className="text-xs font-medium text-slate-600 block mb-1">Working Hours</label>
            <div className="flex gap-2">
              <input type="time" defaultValue="09:00" className="flex-1 text-sm px-2 py-2 rounded-lg border border-slate-200 outline-none" />
              <span className="text-slate-400 self-center text-xs">–</span>
              <input type="time" defaultValue="18:00" className="flex-1 text-sm px-2 py-2 rounded-lg border border-slate-200 outline-none" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600 block mb-2">Active Days</label>
            <div className="flex gap-1 flex-wrap">
              {["Mo","Tu","We","Th","Fr","Sa","Su"].map((d, i) => (
                <button key={d} className={`w-9 h-9 text-xs rounded-lg font-medium ${i < 5 ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-500"}`}>{d}</button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-700">Stop On Reply</p>
              <p className="text-xs text-slate-400">Pause on response</p>
            </div>
            <Toggle checked={stopOnReply} onChange={setStopOnReply} />
          </div>
        </div>

        {/* Variables */}
        <h3 className="font-semibold text-slate-800 mt-5 mb-2">Variables</h3>
        <div className="space-y-1">
          {["{{first_name}}", "{{last_name}}", "{{company}}", "{{title}}", "{{location}}", "{{industry}}"].map(v => (
            <div key={v} className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5">
              <code className="text-xs text-violet-600">{v}</code>
              <button className="text-slate-400 hover:text-slate-600"><Copy size={12} /></button>
            </div>
          ))}
        </div>

        {/* Templates (email only) */}
        {isEmail && (
          <>
            <h3 className="font-semibold text-slate-800 mt-5 mb-2">Templates</h3>
            <div className="space-y-2">
              {emailTemplates.map(t => (
                <div key={t.id} className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-700 truncate">{t.name}</p>
                      <p className="text-xs text-slate-400 truncate mt-0.5">{t.subject}</p>
                    </div>
                    <button className="text-xs px-2 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex-shrink-0">Use</button>
                  </div>
                  {t.openRate > 0 && (
                    <div className="flex gap-3 mt-2">
                      <span className="text-xs text-slate-400">Open {t.openRate}%</span>
                      <span className="text-xs text-slate-400">Click {t.clickRate}%</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Edit step modal */}
      {editingStep && (() => {
        const pool = [...LI_STEP_TYPES, ...EMAIL_STEP_TYPES];
        const def  = [...stepTypesFor(channel), ...pool].find(s => s.type === editingStep.type) || pool[0];
        const Icon = def.icon;
        const VarChips = () => (
          <div className="flex gap-1 flex-wrap mt-1 mb-2">
            {["{{first_name}}", "{{last_name}}", "{{company}}", "{{title}}", "{{location}}"].map(v => (
              <span key={v} className="text-xs px-1.5 py-0.5 bg-violet-50 text-violet-600 rounded border border-violet-200 cursor-pointer hover:bg-violet-100 select-none">{v}</span>
            ))}
          </div>
        );
        const Field = ({ label, children, hint }) => (
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">{label}</label>
            {children}
            {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
          </div>
        );
        const TextInput = (props) => (
          <input {...props} className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
        );
        const TextArea = ({ rows = 5, ...props }) => (
          <textarea rows={rows} {...props} className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono bg-white" />
        );
        const Select = ({ options, ...props }) => (
          <select {...props} className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 bg-white">
            {options.map(o => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}
          </select>
        );

        const renderBody = () => {
          switch (editingStep.type) {

            /* ── WAIT ───────────────────────────────────────────── */
            case "wait":
              return (
                <Field label="Wait Duration" hint="The sequence will pause for this long before executing the next step.">
                  <div className="flex gap-3">
                    <TextInput type="number" defaultValue={editingStep.delay || 1} style={{width:"100px"}} />
                    <Select options={[{value:"hours",label:"Hours"},{value:"days",label:"Days"},{value:"weeks",label:"Weeks"}]} defaultValue={editingStep.unit || "days"} />
                  </div>
                </Field>
              );

            /* ── CONNECT ────────────────────────────────────────── */
            case "connect":
              return (
                <>
                  <Field label="Connection Note" hint="Optional · max 300 characters. Leave blank to send without a note.">
                    <VarChips />
                    <TextArea rows={4} defaultValue={editingStep.note} placeholder="Hi {{first_name}}, I noticed your work at {{company}} and would love to connect!" />
                  </Field>
                  <Field label="Withdraw if not accepted after">
                    <div className="flex gap-3">
                      <TextInput type="number" defaultValue={editingStep.withdrawAfter || 21} style={{width:"100px"}} />
                      <Select options={["Days","Weeks"]} defaultValue="Days" />
                    </div>
                  </Field>
                </>
              );

            /* ── MESSAGE ────────────────────────────────────────── */
            case "message":
              return (
                <Field label="Message" hint="Only sent to accepted connections.">
                  <VarChips />
                  <TextArea rows={6} defaultValue={editingStep.note} placeholder="Hi {{first_name}}, thanks for connecting! I'd love to learn more about your work at {{company}}." />
                </Field>
              );

            /* ── INMAIL ─────────────────────────────────────────── */
            case "inmail":
              return (
                <>
                  <Field label="InMail Subject" hint="Required for InMail — max 200 characters.">
                    <TextInput defaultValue={editingStep.subject} placeholder="Quick question for {{first_name}}" />
                  </Field>
                  <Field label="InMail Body">
                    <VarChips />
                    <TextArea rows={8} defaultValue={editingStep.note} placeholder={"Hi {{first_name}},\n\nI came across your profile and wanted to reach out directly..."} />
                  </Field>
                  <Field label="InMail Type">
                    <Select options={[{value:"paid",label:"Paid InMail (credits)"},{value:"free",label:"Free InMail (Open Profiles only)"}]} defaultValue="paid" />
                  </Field>
                </>
              );

            /* ── VOICE MESSAGE ──────────────────────────────────── */
            case "voice":
              return (
                <>
                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 flex gap-3">
                    <Mic size={18} className="text-purple-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-purple-800">Voice Message</p>
                      <p className="text-xs text-purple-600 mt-1">LinkedIn voice messages are recorded natively in the app. OpenReach will create a task reminding you to record and send it at this step. Max 60 seconds.</p>
                    </div>
                  </div>
                  <Field label="Task Reminder Note" hint="This note will appear on the manual task created for you.">
                    <TextInput defaultValue={editingStep.note || "Record & send voice message to {{first_name}} at {{company}}"} />
                  </Field>
                  <Field label="When to send">
                    <Select options={["Morning (8–10 AM)","Midday (12–2 PM)","Afternoon (3–5 PM)","Any time"]} defaultValue="Morning (8–10 AM)" />
                  </Field>
                </>
              );

            /* ── VIEW PROFILE ───────────────────────────────────── */
            case "view":
              return (
                <>
                  <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4 flex gap-3">
                    <Eye size={18} className="text-cyan-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-cyan-800">Profile View</p>
                      <p className="text-xs text-cyan-600 mt-1">OpenReach will visit their LinkedIn profile. They will see you in their "Who viewed my profile" section — a warm signal before your connection request.</p>
                    </div>
                  </div>
                  <Field label="Profile View Mode">
                    <Select options={[{value:"private",label:"Anonymous (they won't see you)"},{value:"public",label:"Public (they will see your name)"}]} defaultValue="public" />
                  </Field>
                  <Field label="Number of visits">
                    <Select options={["1 visit","2 visits","3 visits"]} defaultValue="1 visit" />
                  </Field>
                </>
              );

            /* ── FOLLOW ─────────────────────────────────────────── */
            case "follow":
              return (
                <div className="bg-pink-50 border border-pink-200 rounded-xl p-4 flex gap-3">
                  <Star size={18} className="text-pink-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-pink-800">Follow on LinkedIn</p>
                    <p className="text-xs text-pink-600 mt-1">OpenReach will follow this person on LinkedIn. They'll receive a notification, which helps warm up the relationship before your outreach.</p>
                  </div>
                </div>
              );

            /* ── ENDORSE SKILLS ─────────────────────────────────── */
            case "endorse":
              return (
                <>
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex gap-3">
                    <Award size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-emerald-800">Endorse Skills</p>
                      <p className="text-xs text-emerald-600 mt-1">OpenReach will endorse up to 3 of their top skills. This is a powerful warm-up signal — people often reciprocate and check out your profile.</p>
                    </div>
                  </div>
                  <Field label="Skills to Endorse">
                    <Select options={[{value:"auto",label:"Auto — endorse their top listed skills"},{value:"manual",label:"Manual — specify skill names below"}]} defaultValue="auto" />
                  </Field>
                  <Field label="Manual Skill Names (optional)" hint="Comma-separated. Leave blank for automatic selection.">
                    <TextInput defaultValue={editingStep.skills} placeholder="e.g. Product Management, Leadership, SaaS" />
                  </Field>
                  <Field label="Max endorsements per contact">
                    <Select options={["1 skill","2 skills","3 skills"]} defaultValue="3 skills" />
                  </Field>
                </>
              );

            /* ── LIKE POST ──────────────────────────────────────── */
            case "like":
              return (
                <>
                  <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex gap-3">
                    <ThumbsUp size={18} className="text-rose-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-rose-800">Like a Post</p>
                      <p className="text-xs text-rose-600 mt-1">OpenReach will like one of their recent LinkedIn posts. The contact receives a notification and sees your name — a warm, non-intrusive touchpoint.</p>
                    </div>
                  </div>
                  <Field label="Which post to like">
                    <Select options={[{value:"latest",label:"Their most recent post"},{value:"latest3",label:"Random from latest 3 posts"},{value:"mostliked",label:"Their most liked post"}]} defaultValue="latest" />
                  </Field>
                  <Field label="Reaction type">
                    <Select options={["👍 Like","❤️ Love","🎉 Celebrate","💡 Insightful","👏 Support"]} defaultValue="👍 Like" />
                  </Field>
                </>
              );

            /* ── COMMENT ON POST ────────────────────────────────── */
            case "comment":
              return (
                <>
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex gap-3">
                    <MessageCircle size={18} className="text-orange-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-orange-800">Comment on Post</p>
                      <p className="text-xs text-orange-600 mt-1">Leave a genuine, personalised comment on one of their recent posts. This is highly visible and creates a strong warm-up signal before connecting.</p>
                    </div>
                  </div>
                  <Field label="Which post to comment on">
                    <Select options={[{value:"latest",label:"Their most recent post"},{value:"latest3",label:"Random from latest 3 posts"},{value:"mostliked",label:"Their most liked post"}]} defaultValue="latest" />
                  </Field>
                  <Field label="Comment Text" hint="Keep it genuine and relevant. Avoid generic comments like 'Great post!'">
                    <VarChips />
                    <TextArea rows={4} defaultValue={editingStep.note} placeholder="Really interesting take on this, {{first_name}}. I've seen similar patterns at companies like {{company}} — would love to discuss further." />
                  </Field>
                  <Field label="Fallback if no recent post">
                    <Select options={["Skip this step","Like instead","Send message instead"]} defaultValue="Skip this step" />
                  </Field>
                </>
              );

            /* ── EMAIL ──────────────────────────────────────────── */
            case "email":
            case "followup":
              return (
                <>
                  <Field label="Subject Line">
                    <TextInput defaultValue={editingStep.subject} placeholder="e.g. Quick question about {{company}}" />
                  </Field>
                  <Field label="Email Body" hint="Use variables for personalisation.">
                    <VarChips />
                    <TextArea rows={10} defaultValue={editingStep.note} placeholder={"Hi {{first_name}},\n\n..."} />
                  </Field>
                  {editingStep.type === "followup" && (
                    <Field label="Send as reply to previous email">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="as-reply" defaultChecked className="rounded" />
                        <label htmlFor="as-reply" className="text-sm text-slate-600">Thread as reply (keeps same subject)</label>
                      </div>
                    </Field>
                  )}
                </>
              );

            /* ── A/B TEST ───────────────────────────────────────── */
            case "abtest":
              return (
                <>
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 flex gap-2 mb-2">
                    <FlaskConical size={16} className="text-orange-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-orange-700">Split contacts 50/50 between Variant A and Variant B. OpenReach tracks opens, clicks, and replies for each and shows a winner.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-blue-600 uppercase tracking-wide">Variant A</p>
                      <Field label="Subject A">
                        <TextInput defaultValue={editingStep.subjectA} placeholder="Subject line A" />
                      </Field>
                      <Field label="Body A">
                        <TextArea rows={5} defaultValue={editingStep.bodyA} placeholder="Email body A..." />
                      </Field>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-rose-600 uppercase tracking-wide">Variant B</p>
                      <Field label="Subject B">
                        <TextInput defaultValue={editingStep.subjectB} placeholder="Subject line B" />
                      </Field>
                      <Field label="Body B">
                        <TextArea rows={5} defaultValue={editingStep.bodyB} placeholder="Email body B..." />
                      </Field>
                    </div>
                  </div>
                  <Field label="Determine winner after">
                    <Select options={["24 hours","48 hours","72 hours","7 days"]} defaultValue="48 hours" />
                  </Field>
                  <Field label="Winner metric">
                    <Select options={["Highest open rate","Highest click rate","Highest reply rate"]} defaultValue="Highest reply rate" />
                  </Field>
                </>
              );

            /* ── CONDITION ──────────────────────────────────────── */
            case "condition":
              return (
                <>
                  <Field label="Trigger Condition" hint="The sequence will branch based on this event.">
                    <Select options={[
                      "If email was opened",
                      "If link was clicked",
                      "If replied to any step",
                      "If connected on LinkedIn",
                      "If not opened after delay",
                      "If not clicked after delay",
                      "If not replied after delay",
                      "If deal stage is ...",
                      "If tag is applied",
                    ]} defaultValue={editingStep.condition || "If email was opened"} />
                  </Field>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-emerald-200 bg-emerald-50 rounded-xl p-3">
                      <p className="text-xs font-bold text-emerald-700 mb-1">✅ If TRUE → next step</p>
                      <p className="text-xs text-slate-500">Sequence continues normally</p>
                    </div>
                    <div className="border border-red-200 bg-red-50 rounded-xl p-3">
                      <p className="text-xs font-bold text-red-600 mb-1">❌ If FALSE → </p>
                      <Select options={["Skip to next step","End sequence","Jump to step ..."]} defaultValue="Skip to next step" />
                    </div>
                  </div>
                </>
              );

            /* ── TAG CONTACT ────────────────────────────────────── */
            case "tag":
              return (
                <>
                  <Field label="Tag to Apply" hint="This tag will be added to the contact automatically when this step runs.">
                    <Select options={[
                      {value:"hot",     label:"🔴 Hot"},
                      {value:"warm",    label:"🟡 Warm"},
                      {value:"cold",    label:"🔵 Cold"},
                      {value:"replied", label:"✅ Replied"},
                      {value:"noreply", label:"⏳ No Reply"},
                      {value:"meeting", label:"📅 Meeting Booked"},
                      {value:"custom",  label:"+ Custom tag..."},
                    ]} defaultValue={editingStep.tagName || "hot"} />
                  </Field>
                  <Field label="Custom Tag Name (if Custom selected)">
                    <TextInput defaultValue={editingStep.customTag} placeholder="e.g. Q2 Target, High Value" />
                  </Field>
                  <Field label="Also remove tags">
                    <TextInput defaultValue={editingStep.removeTags} placeholder="Comma-separated tags to remove, e.g. Cold, Unqualified" />
                  </Field>
                </>
              );

            /* ── MOVE DEAL STAGE ────────────────────────────────── */
            case "movestage":
              return (
                <>
                  <Field label="Move Contact's Deal To" hint="The contact's CRM deal will be automatically moved to this pipeline stage.">
                    <Select options={[
                      {value:"lead",       label:"🔵 New Lead"},
                      {value:"connected",  label:"🟢 Connected"},
                      {value:"interested", label:"🟣 Interested"},
                      {value:"meeting",    label:"🟡 Meeting Booked"},
                      {value:"won",        label:"✅ Closed Won"},
                      {value:"lost",       label:"❌ Closed Lost"},
                    ]} defaultValue={editingStep.stageName || "connected"} />
                  </Field>
                  <Field label="Only move if current stage is">
                    <Select options={[{value:"any",label:"Any stage (always move)"},{value:"lead",label:"New Lead"},{value:"connected",label:"Connected"}]} defaultValue="any" />
                  </Field>
                </>
              );

            /* ── WEBHOOK ────────────────────────────────────────── */
            case "webhook":
              return (
                <>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex gap-2 mb-1">
                    <Link2 size={15} className="text-slate-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-600">Fire an HTTP request to any URL when this step runs. Use it to push data to HubSpot, Zapier, Slack, your own API, or any other tool.</p>
                  </div>
                  <Field label="Webhook URL">
                    <TextInput defaultValue={editingStep.webhookUrl} placeholder="https://hooks.zapier.com/hooks/catch/..." />
                  </Field>
                  <Field label="HTTP Method">
                    <Select options={["POST","GET","PUT","PATCH"]} defaultValue="POST" />
                  </Field>
                  <Field label="Payload Template (JSON)" hint="Use {{variables}} to inject contact data.">
                    <TextArea rows={6} defaultValue={editingStep.payload || `{\n  "contact": "{{first_name}} {{last_name}}",\n  "company": "{{company}}",\n  "email": "{{email}}"\n}`} />
                  </Field>
                  <Field label="Secret Header (optional)" hint="Added as X-OpenReach-Secret for authentication.">
                    <TextInput type="password" defaultValue={editingStep.secret} placeholder="your-secret-token" />
                  </Field>
                </>
              );

            /* ── MANUAL TASK ────────────────────────────────────── */
            case "task":
              return (
                <>
                  <Field label="Task Description" hint="A to-do item will be created in your task list at this point in the sequence.">
                    <VarChips />
                    <TextInput defaultValue={editingStep.note} placeholder="e.g. Call {{first_name}} at {{company}} to follow up" />
                  </Field>
                  <Field label="Due Date (relative)">
                    <Select options={["Same day","1 day after step","2 days after step","3 days after step","1 week after step"]} defaultValue="Same day" />
                  </Field>
                  <Field label="Priority">
                    <Select options={[{value:"high",label:"🔴 High"},{value:"medium",label:"🟡 Medium"},{value:"low",label:"🔵 Low"}]} defaultValue="medium" />
                  </Field>
                </>
              );

            default:
              return (
                <Field label="Note">
                  <TextArea rows={5} defaultValue={editingStep.note} placeholder="Add details for this step..." />
                </Field>
              );
          }
        };

        return (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setEditingStep(null)}>
            <div className="bg-white rounded-2xl shadow-2xl w-[600px] max-h-[85vh] overflow-y-auto flex flex-col" onClick={e => e.stopPropagation()}>
              {/* Modal header */}
              <div className="flex items-center gap-3 p-5 border-b border-slate-100 sticky top-0 bg-white z-10">
                <div className={`p-2 rounded-xl ${def.color}`}>
                  <Icon size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{def.label}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{def.desc}</p>
                </div>
                <button onClick={() => setEditingStep(null)} className="ml-auto p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X size={16} /></button>
              </div>

              {/* Form body */}
              <div className="p-5 space-y-4 flex-1 overflow-y-auto">
                {renderBody()}
              </div>

              {/* Footer */}
              <div className="flex gap-2 p-5 border-t border-slate-100 sticky bottom-0 bg-white">
                <button onClick={() => setEditingStep(null)} className="flex-1 py-2.5 text-sm text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50">Cancel</button>
                <button onClick={() => setEditingStep(null)} className="flex-1 py-2.5 text-sm bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium">Save Step</button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

// ─── Channel Badge ────────────────────────────────────────────────────────────
function ChannelBadge({ channel }) {
  const map = {
    linkedin:     { label: "LinkedIn",      cls: "bg-blue-100 text-blue-700",   icon: "💼" },
    email:        { label: "Email",         cls: "bg-rose-100 text-rose-700",   icon: "✉️" },
    multichannel: { label: "Multi-channel", cls: "bg-violet-100 text-violet-700", icon: "⚡" },
  };
  const m = map[channel] || map.linkedin;
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${m.cls}`}>
      <span>{m.icon}</span>{m.label}
    </span>
  );
}

// ─── New Campaign Modal ───────────────────────────────────────────────────────
function NewCampaignModal({ onClose, onCreate }) {
  const [chosen, setChosen] = useState(null);
  const options = [
    { id: "linkedin",     icon: "💼", title: "LinkedIn Campaign",      desc: "Connect, message, and nurture leads directly on LinkedIn using automated sequences.", color: "border-blue-300 bg-blue-50" },
    { id: "email",        icon: "✉️", title: "Email Campaign",          desc: "Send personalised cold email sequences with open/click tracking and auto follow-ups.", color: "border-rose-300 bg-rose-50" },
    { id: "multichannel", icon: "⚡", title: "Multi-channel Campaign",  desc: "Combine LinkedIn and email in one coordinated sequence for maximum reach.", color: "border-violet-300 bg-violet-50" },
  ];
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-[540px]" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div>
            <h2 className="font-bold text-slate-900 text-lg">New Campaign</h2>
            <p className="text-sm text-slate-400 mt-0.5">Choose your outreach channel</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100"><X size={16} /></button>
        </div>
        <div className="p-5 space-y-3">
          {options.map(o => (
            <button key={o.id} onClick={() => setChosen(o.id)}
              className={`w-full flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all ${chosen === o.id ? o.color : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"}`}>
              <span className="text-2xl mt-0.5">{o.icon}</span>
              <div>
                <p className="font-semibold text-slate-800">{o.title}</p>
                <p className="text-sm text-slate-500 mt-0.5">{o.desc}</p>
              </div>
              {chosen === o.id && <CheckCircle size={18} className="ml-auto flex-shrink-0 text-blue-600 mt-0.5" />}
            </button>
          ))}
        </div>
        <div className="flex gap-2 p-5 border-t border-slate-100">
          <button onClick={onClose} className="flex-1 py-2.5 text-sm text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50">Cancel</button>
          <button onClick={() => chosen && onCreate(chosen)} disabled={!chosen}
            className={`flex-1 py-2.5 text-sm font-medium rounded-xl transition-colors ${chosen ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-slate-200 text-slate-400"}`}>
            Create Campaign →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Email Templates Page ─────────────────────────────────────────────────────
function EmailTemplatesPage() {
  const [preview, setPreview] = useState(null);
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-slate-500">{emailTemplates.length} templates available</p>
        <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
          <Plus size={14} /> New Template
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {emailTemplates.map(t => (
          <div key={t.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:border-blue-300 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0 pr-3">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 mb-2 inline-block">{t.category}</span>
                <h3 className="font-semibold text-slate-900">{t.name}</h3>
                <p className="text-xs text-slate-500 mt-1 truncate">Subject: <em>{t.subject}</em></p>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <button onClick={() => setPreview(t)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><Eye size={14} /></button>
                <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><Copy size={14} /></button>
                <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><Edit3 size={14} /></button>
              </div>
            </div>
            <p className="text-xs text-slate-400 line-clamp-2 mb-4 font-mono bg-slate-50 rounded-lg p-2">{t.body.split('\n')[2]}</p>
            <div className="flex items-center justify-between border-t border-slate-50 pt-3">
              <div className="flex gap-4">
                {t.openRate > 0 ? (
                  <>
                    <div className="text-center">
                      <p className="text-sm font-bold text-emerald-600">{t.openRate}%</p>
                      <p className="text-xs text-slate-400">Open</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-blue-600">{t.clickRate}%</p>
                      <p className="text-xs text-slate-400">Click</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-violet-600">{t.usedIn}</p>
                      <p className="text-xs text-slate-400">Used in</p>
                    </div>
                  </>
                ) : (
                  <p className="text-xs text-slate-400 italic">No stats yet</p>
                )}
              </div>
              <button className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700">Use Template</button>
            </div>
          </div>
        ))}
      </div>

      {/* Preview modal */}
      {preview && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setPreview(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-[600px] max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900">{preview.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{preview.category}</p>
              </div>
              <button onClick={() => setPreview(null)} className="p-2 rounded-lg hover:bg-slate-100"><X size={16} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <div className="bg-slate-50 rounded-xl p-4 mb-4">
                <p className="text-xs text-slate-400 mb-1">Subject</p>
                <p className="text-sm font-semibold text-slate-800">{preview.subject}</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-2">Body Preview</p>
                <pre className="text-sm text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">{preview.body}</pre>
              </div>
            </div>
            <div className="flex gap-2 p-4 border-t border-slate-100">
              <button onClick={() => setPreview(null)} className="flex-1 py-2 text-sm border border-slate-200 rounded-xl hover:bg-slate-50">Close</button>
              <button className="flex-1 py-2 text-sm bg-blue-600 text-white rounded-xl hover:bg-blue-700">Use This Template</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Campaigns Page ──────────────────────────────────────────────────────────
function CampaignsPage() {
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showNewModal, setShowNewModal]         = useState(false);
  const [channelTab, setChannelTab]             = useState("all");  // all|linkedin|email|multichannel
  const [subTab, setSubTab]                     = useState("campaigns"); // campaigns|templates

  const handleCreate = (channel) => {
    setShowNewModal(false);
    setSelectedCampaign({ channel, id: "new", name: "New Campaign" });
  };

  if (selectedCampaign !== null) {
    const camp = selectedCampaign === "new" ? null
      : typeof selectedCampaign === "object" ? selectedCampaign
      : campaigns.find(c => c.id === selectedCampaign);
    return <CampaignBuilder campaign={camp} onBack={() => setSelectedCampaign(null)} />;
  }

  const filteredCampaigns = campaigns.filter(c =>
    channelTab === "all" || c.channel === channelTab
  );

  const CHANNEL_TABS = [
    { id: "all",          label: "All",           count: campaigns.length },
    { id: "linkedin",     label: "💼 LinkedIn",   count: campaigns.filter(c => c.channel === "linkedin").length },
    { id: "email",        label: "✉️ Email",       count: campaigns.filter(c => c.channel === "email").length },
    { id: "multichannel", label: "⚡ Multi",        count: campaigns.filter(c => c.channel === "multichannel").length },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Sub-nav */}
      <div className="bg-white border-b border-slate-100 px-6 flex items-center justify-between">
        <div className="flex">
          {[{ id: "campaigns", label: "Campaigns" }, { id: "templates", label: "Email Templates" }].map(t => (
            <button key={t.id} onClick={() => setSubTab(t.id)}
              className={`py-3.5 px-1 mr-6 text-sm font-medium border-b-2 transition-colors ${subTab === t.id ? "border-blue-600 text-blue-600" : "border-transparent text-slate-400 hover:text-slate-600"}`}>
              {t.label}
            </button>
          ))}
        </div>
        <button onClick={() => setShowNewModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 my-3">
          <Plus size={15} /> New Campaign
        </button>
      </div>

      {subTab === "templates" ? <EmailTemplatesPage /> : (
        <div className="flex-1 overflow-y-auto p-6">
          {/* Channel filter tabs */}
          <div className="flex gap-1 mb-5 bg-slate-100 rounded-xl p-1 w-fit">
            {CHANNEL_TABS.map(t => (
              <button key={t.id} onClick={() => setChannelTab(t.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${channelTab === t.id ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
                {t.label}
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${channelTab === t.id ? "bg-slate-100 text-slate-600" : "bg-slate-200 text-slate-500"}`}>{t.count}</span>
              </button>
            ))}
          </div>

          <div className="grid gap-4">
            {filteredCampaigns.map(c => {
              const isEmail = c.channel === "email";
              const isMulti = c.channel === "multichannel";
              return (
                <div key={c.id} className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm hover:border-blue-200 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-semibold text-slate-900">{c.name}</h3>
                        <ChannelBadge channel={c.channel} />
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[c.status]}`}>{c.status}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{c.steps} steps · Created {c.created} · Last activity {c.lastActivity}</p>
                      {(isEmail || isMulti) && c.fromEmail && (
                        <p className="text-xs text-slate-400 mt-0.5">From: {c.fromName} &lt;{c.fromEmail}&gt;</p>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {c.status === "active"  && <button className="p-2 rounded-lg hover:bg-slate-100 text-amber-500"><Pause size={15} /></button>}
                      {c.status === "paused"  && <button className="p-2 rounded-lg hover:bg-slate-100 text-emerald-500"><Play size={15} /></button>}
                      <button onClick={() => setSelectedCampaign(c.id)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"><Edit3 size={15} /></button>
                      <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"><Copy size={15} /></button>
                      <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"><MoreHorizontal size={15} /></button>
                    </div>
                  </div>

                  {/* Metrics grid — adapts by channel */}
                  <div className={`grid gap-3 mt-4 ${isEmail ? "grid-cols-5" : "grid-cols-4"}`}>
                    {!isEmail && [
                      { label: "Total Leads", value: c.leads,    color: "text-slate-700" },
                      { label: "Accepted",    value: c.accepted, color: "text-emerald-600" },
                      { label: "Replied",     value: c.replied,  color: "text-blue-600" },
                      { label: "Pending",     value: c.pending,  color: "text-amber-600" },
                    ].map(m => (
                      <div key={m.label} className="bg-slate-50 rounded-xl p-3">
                        <p className="text-xs text-slate-400">{m.label}</p>
                        <p className={`text-xl font-bold mt-0.5 ${m.color}`}>{m.value}</p>
                      </div>
                    ))}
                    {isEmail && [
                      { label: "Sent",    value: c.sent,    color: "text-slate-700",   icon: "📤" },
                      { label: "Opened",  value: c.opened,  color: "text-blue-600",    icon: "👁" },
                      { label: "Clicked", value: c.clicked, color: "text-violet-600",  icon: "🖱" },
                      { label: "Replied", value: c.replied, color: "text-emerald-600", icon: "↩️" },
                      { label: "Bounced", value: c.bounced, color: "text-red-500",     icon: "⚠️" },
                    ].map(m => (
                      <div key={m.label} className="bg-slate-50 rounded-xl p-3">
                        <p className="text-xs text-slate-400">{m.icon} {m.label}</p>
                        <p className={`text-xl font-bold mt-0.5 ${m.color}`}>{m.value}</p>
                      </div>
                    ))}
                    {isMulti && [
                      { label: "Total Leads", value: c.leads,    color: "text-slate-700" },
                      { label: "LI Accepted", value: c.accepted, color: "text-blue-600" },
                      { label: "Email Opens", value: c.opened,   color: "text-violet-600" },
                      { label: "Replied",     value: c.replied,  color: "text-emerald-600" },
                    ].map(m => (
                      <div key={m.label} className="bg-slate-50 rounded-xl p-3">
                        <p className="text-xs text-slate-400">{m.label}</p>
                        <p className={`text-xl font-bold mt-0.5 ${m.color}`}>{m.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Rate bars */}
                  {c.leads > 0 || c.sent > 0 ? (
                    <div className="mt-4 flex items-center gap-4">
                      {!isEmail && c.leads > 0 && (
                        <>
                          <div className="flex-1">
                            <div className="flex justify-between text-xs text-slate-400 mb-1"><span>Acceptance rate</span><span className="font-medium text-slate-600">{c.acceptRate}%</span></div>
                            <div className="h-1.5 bg-slate-100 rounded-full"><div className="h-1.5 bg-emerald-500 rounded-full" style={{ width: `${c.acceptRate}%` }} /></div>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between text-xs text-slate-400 mb-1"><span>Reply rate</span><span className="font-medium text-slate-600">{c.replyRate}%</span></div>
                            <div className="h-1.5 bg-slate-100 rounded-full"><div className="h-1.5 bg-blue-500 rounded-full" style={{ width: `${c.replyRate}%` }} /></div>
                          </div>
                        </>
                      )}
                      {isEmail && c.sent > 0 && (
                        <>
                          <div className="flex-1">
                            <div className="flex justify-between text-xs text-slate-400 mb-1"><span>Open rate</span><span className="font-medium text-slate-600">{c.openRate}%</span></div>
                            <div className="h-1.5 bg-slate-100 rounded-full"><div className="h-1.5 bg-blue-500 rounded-full" style={{ width: `${c.openRate}%` }} /></div>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between text-xs text-slate-400 mb-1"><span>Click rate</span><span className="font-medium text-slate-600">{c.clickRate}%</span></div>
                            <div className="h-1.5 bg-slate-100 rounded-full"><div className="h-1.5 bg-violet-500 rounded-full" style={{ width: `${c.clickRate}%` }} /></div>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between text-xs text-slate-400 mb-1"><span>Reply rate</span><span className="font-medium text-slate-600">{c.replyRate}%</span></div>
                            <div className="h-1.5 bg-slate-100 rounded-full"><div className="h-1.5 bg-emerald-500 rounded-full" style={{ width: `${c.replyRate}%` }} /></div>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between text-xs text-slate-400 mb-1"><span>Bounce rate</span><span className={`font-medium ${c.bounceRate > 5 ? "text-red-500" : "text-slate-600"}`}>{c.bounceRate}%</span></div>
                            <div className="h-1.5 bg-slate-100 rounded-full"><div className={`h-1.5 rounded-full ${c.bounceRate > 5 ? "bg-red-400" : "bg-slate-400"}`} style={{ width: `${c.bounceRate * 5}%` }} /></div>
                          </div>
                        </>
                      )}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {showNewModal && <NewCampaignModal onClose={() => setShowNewModal(false)} onCreate={handleCreate} />}
    </div>
  );
}

// ─── Leads Page ──────────────────────────────────────────────────────────────
function LeadsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedLeads, setSelectedLeads] = useState([]);

  const filtered = leads.filter(l => {
    const matchSearch = l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.company.toLowerCase().includes(search.toLowerCase()) ||
      l.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || l.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const toggleLead = (id) => setSelectedLeads(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const toggleAll = () => setSelectedLeads(selectedLeads.length === filtered.length ? [] : filtered.map(l => l.id));

  return (
    <div className="p-6">
      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search leads..." className="pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>
        <select
          value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="text-sm px-3 py-2 border border-slate-200 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="replied">Replied</option>
          <option value="rejected">Rejected</option>
        </select>
        {selectedLeads.length > 0 && (
          <div className="flex gap-2 ml-2">
            <button className="flex items-center gap-1.5 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
              <Zap size={14} /> Add to Campaign
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
              <Trash2 size={14} /> Delete ({selectedLeads.length})
            </button>
          </div>
        )}
        <div className="ml-auto flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
            <Upload size={14} /> Import CSV
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus size={14} /> Add Lead
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="px-4 py-3 text-left w-10">
                <input type="checkbox" checked={selectedLeads.length === filtered.length && filtered.length > 0} onChange={toggleAll} className="rounded" />
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Title</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Company</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Campaign</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Added</th>
              <th className="px-4 py-3 w-10" />
            </tr>
          </thead>
          <tbody>
            {filtered.map(l => (
              <tr key={l.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3">
                  <input type="checkbox" checked={selectedLeads.includes(l.id)} onChange={() => toggleLead(l.id)} className="rounded" />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${avatarColor(l.avatar)} flex items-center justify-center text-xs text-white font-bold flex-shrink-0`}>
                      {l.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{l.name}</p>
                      <p className="text-xs text-slate-400">{l.location}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{l.title}</td>
                <td className="px-4 py-3 text-sm text-slate-600 font-medium">{l.company}</td>
                <td className="px-4 py-3 text-xs text-slate-500">{l.campaign}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[l.status]}`}>{l.status}</span>
                </td>
                <td className="px-4 py-3 text-sm text-slate-400">{l.addedDate}</td>
                <td className="px-4 py-3">
                  <button className="p-1 rounded hover:bg-slate-100 text-slate-400"><MoreHorizontal size={15} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-400">{filtered.length} of {leads.length} leads</p>
          <div className="flex gap-1">
            <button className="px-2 py-1 text-xs rounded border border-slate-200 text-slate-400">Previous</button>
            <button className="px-2 py-1 text-xs rounded border border-blue-500 bg-blue-50 text-blue-600">1</button>
            <button className="px-2 py-1 text-xs rounded border border-slate-200 text-slate-400">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Inbox Page ──────────────────────────────────────────────────────────────
// ─── Gmail Compose Modal ─────────────────────────────────────────────────────
function GmailCompose({ onClose }) {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  return (
    <div className="fixed bottom-4 right-4 w-[500px] bg-white rounded-xl shadow-2xl border border-slate-200 z-50 flex flex-col" style={{ maxHeight: "480px" }}>
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800 text-white rounded-t-xl flex-shrink-0">
        <p className="text-sm font-medium">New Message</p>
        <button onClick={onClose} className="p-1 hover:bg-slate-700 rounded"><X size={14} /></button>
      </div>
      <div className="border-b border-slate-100 px-4 py-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 w-8">To</span>
          <input value={to} onChange={e => setTo(e.target.value)} placeholder="Recipients" className="flex-1 text-sm outline-none text-slate-700 placeholder-slate-400" />
        </div>
      </div>
      <div className="border-b border-slate-100 px-4 py-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 w-8">Sub</span>
          <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject" className="flex-1 text-sm outline-none text-slate-700 placeholder-slate-400" />
        </div>
      </div>
      <textarea
        value={body} onChange={e => setBody(e.target.value)}
        placeholder="Write your message..."
        className="flex-1 px-4 py-3 text-sm resize-none outline-none text-slate-700 min-h-[180px]"
      />
      <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 flex-shrink-0">
        <button className={`px-5 py-2 text-sm rounded-full font-medium flex items-center gap-2 transition-colors ${body.trim() ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-100 text-blue-400 cursor-not-allowed"}`}>
          <Send size={14} /> Send
        </button>
        <div className="flex gap-1">
          <button className="p-2 hover:bg-slate-100 rounded-full text-slate-500"><Paperclip size={15} /></button>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-500"><Trash2 size={15} /></button>
        </div>
      </div>
    </div>
  );
}

// ─── Inbox Page (LinkedIn + Gmail unified) ───────────────────────────────────
function InboxPage() {
  const [activeChannel, setActiveChannel] = useState("linkedin");
  // LinkedIn state
  const [activeConvo, setActiveConvo] = useState(conversations[0]);
  const [liMessage, setLiMessage] = useState("");
  // Gmail state
  const [gmailLabel, setGmailLabel] = useState("Inbox");
  const [activeThread, setActiveThread] = useState(null);
  const [composing, setComposing] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [searchGmail, setSearchGmail] = useState("");

  const sendLi = () => { if (!liMessage.trim()) return; setLiMessage(""); };

  const filteredThreads = gmailThreads.filter(t => {
    if (gmailLabel === "Starred") return t.starred;
    if (gmailLabel === "Sent") return t.labels.includes("Sent");
    return t.labels.includes("Inbox");
  }).filter(t => {
    if (!searchGmail) return true;
    const q = searchGmail.toLowerCase();
    return t.subject.toLowerCase().includes(q) || t.from.name.toLowerCase().includes(q) || t.snippet.toLowerCase().includes(q);
  });

  const gmailSidebarItems = [
    { label: "Inbox", icon: Inbox, count: gmailThreads.filter(t => t.unread && t.labels.includes("Inbox")).length },
    { label: "Starred", icon: Star },
    { label: "Sent", icon: Send },
    { label: "Drafts", icon: FileText, count: 1 },
  ];

  return (
    <div className="flex flex-col bg-white" style={{ height: "calc(100vh - 73px)" }}>
      {/* Channel Tab Bar */}
      <div className="flex items-center gap-0 px-4 border-b border-slate-100 flex-shrink-0 bg-white">
        <button
          onClick={() => setActiveChannel("linkedin")}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${activeChannel === "linkedin" ? "border-blue-600 text-blue-700 bg-blue-50/60" : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"}`}
        >
          <Linkedin size={15} className="flex-shrink-0" />
          LinkedIn
          <span className="ml-1 min-w-[20px] h-5 bg-blue-100 text-blue-700 text-xs rounded-full flex items-center justify-center px-1">2</span>
        </button>
        <button
          onClick={() => setActiveChannel("gmail")}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${activeChannel === "gmail" ? "border-red-500 text-red-700 bg-red-50/60" : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"}`}
        >
          <Mail size={15} className="flex-shrink-0" />
          Gmail
          <span className="ml-1 min-w-[20px] h-5 bg-red-100 text-red-700 text-xs rounded-full flex items-center justify-center px-1">{gmailThreads.filter(t => t.unread).length}</span>
        </button>
      </div>

      {/* ── LinkedIn Panel ─────────────────────────────────────────────────── */}
      {activeChannel === "linkedin" && (
        <div className="flex flex-1 overflow-hidden">
          <div className="w-72 border-r border-slate-100 flex flex-col flex-shrink-0">
            <div className="p-3 border-b border-slate-100">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input placeholder="Search messages..." className="pl-8 pr-3 py-2 text-sm bg-slate-100 rounded-lg w-full border-0 outline-none" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversations.map(c => (
                <button key={c.id} onClick={() => setActiveConvo(c)}
                  className={`w-full p-3 flex items-start gap-3 hover:bg-slate-50 transition-colors text-left border-b border-slate-50 ${activeConvo?.id === c.id ? "bg-blue-50" : ""}`}>
                  <div className={`w-10 h-10 rounded-full ${avatarColor(c.avatar)} flex items-center justify-center text-sm text-white font-bold flex-shrink-0`}>{c.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-medium ${c.unread ? "text-slate-900" : "text-slate-700"}`}>{c.name}</p>
                      <p className="text-xs text-slate-400 flex-shrink-0 ml-2">{c.time}</p>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 truncate">{c.lastMessage}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-slate-400 truncate">{c.title}</p>
                      {c.unread > 0 && <span className="flex-shrink-0 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">{c.unread}</span>}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          {activeConvo && (
            <div className="flex-1 flex flex-col">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${avatarColor(activeConvo.avatar)} flex items-center justify-center text-sm text-white font-bold`}>{activeConvo.avatar}</div>
                <div>
                  <p className="font-semibold text-slate-900">{activeConvo.name}</p>
                  <p className="text-xs text-slate-400">{activeConvo.title}</p>
                </div>
                <div className="ml-auto flex gap-2">
                  <button className="p-2 rounded-lg hover:bg-slate-100"><Star size={16} className={activeConvo.starred ? "text-amber-400 fill-amber-400" : "text-slate-400"} /></button>
                  <button className="p-2 rounded-lg hover:bg-slate-100"><Archive size={16} className="text-slate-400" /></button>
                  <button className="p-2 rounded-lg hover:bg-slate-100"><MoreHorizontal size={16} className="text-slate-400" /></button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {activeConvo.messages.map(m => (
                  <div key={m.id} className={`flex ${m.sender === "me" ? "justify-end" : "justify-start"}`}>
                    {m.sender === "them" && (
                      <div className={`w-7 h-7 rounded-full ${avatarColor(activeConvo.avatar)} flex items-center justify-center text-xs text-white font-bold mr-2 flex-shrink-0 mt-1`}>{activeConvo.avatar}</div>
                    )}
                    <div className={`max-w-sm ${m.sender === "me" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-800"} rounded-2xl px-4 py-3`}>
                      <p className="text-sm">{m.text}</p>
                      <p className={`text-xs mt-1 ${m.sender === "me" ? "text-blue-200" : "text-slate-400"}`}>{m.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-5 py-4 border-t border-slate-100">
                <div className="flex items-end gap-3 bg-slate-100 rounded-xl p-3">
                  <textarea value={liMessage} onChange={e => setLiMessage(e.target.value)} placeholder="Write a message..." rows={2}
                    className="flex-1 bg-transparent text-sm resize-none outline-none text-slate-800 placeholder-slate-400"
                    onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendLi(); } }} />
                  <button onClick={sendLi} className={`p-2 rounded-lg flex-shrink-0 transition-colors ${liMessage.trim() ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-slate-300 text-slate-400"}`}><Send size={16} /></button>
                </div>
                <p className="text-xs text-slate-400 mt-2 text-center">Messages sent via LinkedIn · Press Enter to send</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Gmail Panel ────────────────────────────────────────────────────── */}
      {activeChannel === "gmail" && (
        <div className="flex flex-1 overflow-hidden">
          {/* Gmail sidebar */}
          <div className="w-44 border-r border-slate-100 flex flex-col py-3 flex-shrink-0 overflow-y-auto">
            <button onClick={() => setComposing(true)}
              className="mx-3 mb-4 flex items-center gap-2 px-3 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-2xl text-sm font-medium shadow-sm transition-colors">
              <Edit3 size={15} /> Compose
            </button>
            {gmailSidebarItems.map(({ label, icon: Icon, count }) => (
              <button key={label} onClick={() => { setGmailLabel(label); setActiveThread(null); }}
                className={`flex items-center gap-3 px-4 py-2 text-sm rounded-r-full mr-3 transition-colors ${gmailLabel === label ? "bg-blue-100 text-blue-800 font-semibold" : "text-slate-700 hover:bg-slate-100"}`}>
                <Icon size={14} className="flex-shrink-0" />
                <span className="flex-1 text-left">{label}</span>
                {count > 0 && <span className="text-xs font-bold">{count}</span>}
              </button>
            ))}
            <div className="mt-4 mx-3 border-t border-slate-100 pt-3">
              <p className="px-1 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Labels</p>
              {["Campaign Follow-up", "Prospects", "Partners"].map(l => (
                <button key={l} className="flex items-center gap-2 px-1 py-1.5 text-xs text-slate-600 hover:text-slate-900 w-full text-left rounded hover:bg-slate-50">
                  <Circle size={9} className="text-blue-400 fill-blue-400 flex-shrink-0" /> {l}
                </button>
              ))}
            </div>
            <div className="mt-auto px-3 pt-4">
              <div className="flex items-center gap-2 px-2 py-2 bg-emerald-50 border border-emerald-100 rounded-xl">
                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                  <Check size={12} className="text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-emerald-800">Google</p>
                  <p className="text-xs text-emerald-600 truncate">Connected</p>
                </div>
              </div>
            </div>
          </div>

          {/* Thread list */}
          <div className={`border-r border-slate-100 flex flex-col flex-shrink-0 ${activeThread ? "w-72" : "flex-1 max-w-lg"}`}>
            <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2 flex-shrink-0">
              <div className="relative flex-1">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input value={searchGmail} onChange={e => setSearchGmail(e.target.value)} placeholder="Search mail..." className="pl-8 pr-3 py-2 text-sm bg-slate-100 rounded-lg w-full border-0 outline-none" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
              {filteredThreads.length === 0 && <div className="p-8 text-center text-slate-400 text-sm">No messages found</div>}
              {filteredThreads.map(t => (
                <button key={t.id} onClick={() => setActiveThread(t)}
                  className={`w-full px-4 py-3 flex items-start gap-3 hover:bg-slate-50 transition-colors text-left ${activeThread?.id === t.id ? "bg-blue-50" : t.unread ? "bg-white" : "bg-slate-50/50"}`}>
                  <div className={`w-9 h-9 rounded-full ${t.from.avatar ? avatarColor(t.from.avatar) : "bg-slate-400"} flex items-center justify-center text-xs text-white font-bold flex-shrink-0 mt-0.5`}>
                    {t.from.avatar || t.from.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <p className={`text-sm truncate ${t.unread ? "font-bold text-slate-900" : "font-medium text-slate-700"}`}>
                        {t.labels.includes("Sent") ? `To: ${t.to.split("@")[0]}` : t.from.name}
                      </p>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {t.starred && <Star size={11} className="text-amber-400 fill-amber-400" />}
                        <p className="text-xs text-slate-400">{t.date}</p>
                      </div>
                    </div>
                    <p className={`text-sm truncate ${t.unread ? "font-medium text-slate-800" : "text-slate-600"}`}>{t.subject}</p>
                    <p className="text-xs text-slate-400 truncate mt-0.5">{t.snippet}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      {t.hasAttachment && <Paperclip size={11} className="text-slate-400" />}
                      {t.isCalendarInvite && <Calendar size={11} className="text-blue-400" />}
                      {t.messages.length > 1 && <span className="text-xs text-slate-400 bg-slate-100 px-1 rounded">{t.messages.length}</span>}
                    </div>
                  </div>
                  {t.unread && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />}
                </button>
              ))}
            </div>
          </div>

          {/* Email Thread View */}
          {activeThread ? (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="px-6 py-3 border-b border-slate-100 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                  <button onClick={() => setActiveThread(null)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 flex-shrink-0"><ChevronLeft size={16} /></button>
                  <h3 className="font-semibold text-slate-900 truncate">{activeThread.subject}</h3>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0 ml-3">
                  <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500"><Archive size={15} /></button>
                  <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500"><Trash2 size={15} /></button>
                  <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500"><MoreHorizontal size={15} /></button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {activeThread.messages.map((msg, idx) => {
                  const isMe = msg.from.email === "basar@openreach.io";
                  const isLast = idx === activeThread.messages.length - 1;
                  return (
                    <div key={msg.id} className={`border border-slate-100 rounded-xl ${!isLast ? "opacity-75" : ""}`}>
                      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 rounded-t-xl">
                        <div className="flex items-center gap-2">
                          <div className={`w-7 h-7 rounded-full ${isMe ? "bg-blue-500" : avatarColor(activeThread.from.avatar || "X")} flex items-center justify-center text-xs text-white font-bold`}>
                            {isMe ? "BK" : (activeThread.from.avatar || msg.from.name[0])}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{msg.from.name}</p>
                            <p className="text-xs text-slate-400">to {msg.to}</p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-400 flex-shrink-0">{msg.date}</p>
                      </div>
                      <div className="px-4 py-4">
                        <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">{msg.body}</p>
                      </div>
                    </div>
                  );
                })}

                {activeThread.isCalendarInvite && (
                  <div className="border border-blue-100 bg-blue-50 rounded-xl p-4 flex items-center gap-4">
                    <Calendar size={20} className="text-blue-600 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-blue-900">Calendar Invitation</p>
                      <p className="text-xs text-blue-600 mt-0.5">Tuesday, April 8, 2026 · 2:00 – 3:00 PM · Google Meet</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button className="px-3 py-1.5 bg-emerald-600 text-white text-xs rounded-lg font-medium hover:bg-emerald-700">Accept</button>
                      <button className="px-3 py-1.5 bg-amber-500 text-white text-xs rounded-lg font-medium hover:bg-amber-600">Maybe</button>
                      <button className="px-3 py-1.5 bg-red-500 text-white text-xs rounded-lg font-medium hover:bg-red-600">Decline</button>
                    </div>
                  </div>
                )}

                {/* Reply box */}
                <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                    <p className="text-xs text-slate-500">Reply to <span className="font-medium text-slate-700">{activeThread.from.name}</span></p>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <button className="hover:text-blue-600 flex items-center gap-1"><Reply size={12} /> Reply</button>
                      <button className="hover:text-blue-600">Reply All</button>
                      <button className="hover:text-blue-600">Forward</button>
                    </div>
                  </div>
                  <textarea value={replyText} onChange={e => setReplyText(e.target.value)}
                    placeholder="Click here to reply..." rows={4}
                    className="w-full px-4 py-3 text-sm resize-none outline-none text-slate-700 placeholder-slate-400" />
                  <div className="px-4 py-3 border-t border-slate-100 flex items-center gap-3">
                    <button className={`px-5 py-2 text-sm rounded-full font-medium flex items-center gap-2 transition-colors ${replyText.trim() ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-100 text-blue-400 cursor-not-allowed"}`}>
                      <Send size={14} /> Send
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded-full text-slate-500"><Paperclip size={15} /></button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-slate-50/50">
              <div className="text-center text-slate-300">
                <MailOpen size={52} className="mx-auto mb-3" />
                <p className="text-sm font-medium text-slate-400">Select a message to read</p>
                <p className="text-xs text-slate-300 mt-1">or compose a new one</p>
              </div>
            </div>
          )}
        </div>
      )}

      {composing && <GmailCompose onClose={() => setComposing(false)} />}
    </div>
  );
}

// ─── Analytics Page ──────────────────────────────────────────────────────────
function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Sent", value: "3,842", change: 18 },
          { label: "Acceptance Rate", value: "39.2%", change: 5 },
          { label: "Reply Rate", value: "14.7%", change: -2 },
          { label: "Conversion Rate", value: "6.1%", change: 12 },
        ].map(m => (
          <div key={m.label} className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
            <p className="text-sm text-slate-500">{m.label}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{m.value}</p>
            <p className={`text-xs mt-1 ${m.change >= 0 ? "text-emerald-600" : "text-red-500"}`}>
              {m.change >= 0 ? "+" : ""}{m.change}% vs last month
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
          <h2 className="font-semibold text-slate-900 mb-4">Activity Over Time</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="sent" fill="#3b82f6" radius={[4,4,0,0]} />
              <Bar dataKey="accepted" fill="#10b981" radius={[4,4,0,0]} />
              <Bar dataKey="replied" fill="#8b5cf6" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
          <h2 className="font-semibold text-slate-900 mb-4">Campaign Performance</h2>
          <div className="space-y-4">
            {campaigns.filter(c => c.leads > 0).map(c => (
              <div key={c.id} className="border border-slate-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-slate-800">{c.name}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[c.status]}`}>{c.status}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-400">Leads</p>
                    <p className="text-sm font-bold text-slate-800">{c.leads}</p>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-2">
                    <p className="text-xs text-slate-400">Accepted</p>
                    <p className="text-sm font-bold text-emerald-700">{c.acceptRate}%</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-2">
                    <p className="text-xs text-slate-400">Replied</p>
                    <p className="text-sm font-bold text-blue-700">{c.replyRate}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Settings Page ────────────────────────────────────────────────────────────
function SettingsPage() {
  return (
    <div className="p-6 max-w-2xl space-y-6">
      {/* Google Workspace */}
      <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-sm">
              <Globe size={16} className="text-blue-500" />
            </div>
            <h2 className="font-semibold text-slate-900">Google Workspace</h2>
          </div>
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">Connected</span>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
            <Mail size={16} className="text-red-500" />
            <div>
              <p className="text-xs font-semibold text-slate-800">Gmail</p>
              <p className="text-xs text-emerald-600">Synced · basar@openreach.io</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
            <CalendarDays size={16} className="text-blue-500" />
            <div>
              <p className="text-xs font-semibold text-slate-800">Google Calendar</p>
              <p className="text-xs text-emerald-600">Synced · basar@openreach.io</p>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-slate-600 block mb-1">Connected Account</label>
            <input type="email" defaultValue="basar@openreach.io" className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600 block mb-1">Send Emails As</label>
            <input type="text" defaultValue="Basar K. <basar@openreach.io>" className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-slate-800">Sync Gmail to Inbox</p>
              <p className="text-xs text-slate-400">Show incoming emails in the Inbox tab</p>
            </div>
            <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer flex-shrink-0">
              <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow" />
            </div>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-slate-800">Sync Google Calendar</p>
              <p className="text-xs text-slate-400">Show your calendar events in the Calendar tab</p>
            </div>
            <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer flex-shrink-0">
              <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow" />
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">Save Changes</button>
          <button className="px-4 py-2 border border-slate-200 text-slate-600 text-sm rounded-lg hover:bg-slate-50">Reconnect Account</button>
        </div>
      </div>

      {[
        {
          title: "LinkedIn Account",
          fields: [
            { label: "LinkedIn Email", type: "email", placeholder: "your@email.com" },
            { label: "LinkedIn Password", type: "password", placeholder: "••••••••" },
          ],
          badge: "Connected",
          badgeColor: "bg-emerald-100 text-emerald-700",
        },
        {
          title: "Safety Limits",
          fields: [
            { label: "Max Connection Requests / Day", type: "number", defaultValue: "50" },
            { label: "Max Messages / Day", type: "number", defaultValue: "100" },
            { label: "Min Delay Between Actions (seconds)", type: "number", defaultValue: "30" },
          ],
        },
        {
          title: "Notifications",
          fields: [
            { label: "Email for Reply Notifications", type: "email", placeholder: "alerts@yourcompany.com" },
          ],
        },
      ].map(section => (
        <div key={section.title} className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-900">{section.title}</h2>
            {section.badge && <span className={`text-xs font-medium px-2 py-1 rounded-full ${section.badgeColor}`}>{section.badge}</span>}
          </div>
          <div className="space-y-3">
            {section.fields.map(f => (
              <div key={f.label}>
                <label className="text-xs font-medium text-slate-600 block mb-1">{f.label}</label>
                <input
                  type={f.type} placeholder={f.placeholder} defaultValue={f.defaultValue}
                  className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">Save Changes</button>
        </div>
      ))}
    </div>
  );
}

// ─── Calendar Page ────────────────────────────────────────────────────────────
function CalendarPage() {
  const [viewMode, setViewMode] = useState("month");
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1)); // April 2026
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showCreate, setShowCreate] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayStr = "2026-04-06";

  const dateStr = (d) => `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const eventsForDay = (d) => calendarEvents.filter(e => e.date === dateStr(d));
  const navMonth = (dir) => { const d = new Date(currentDate); d.setMonth(d.getMonth() + dir); setCurrentDate(d); };

  const eventTypeLabel = { meeting: "Meeting", call: "Call", internal: "Internal", webinar: "Webinar" };

  const upcomingEvents = [...calendarEvents]
    .filter(e => e.date >= todayStr)
    .sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime))
    .slice(0, 8);

  const weekDays = [
    { label: "Sun Apr 5",  ds: "2026-04-05" }, { label: "Mon Apr 6",  ds: "2026-04-06" },
    { label: "Tue Apr 7",  ds: "2026-04-07" }, { label: "Wed Apr 8",  ds: "2026-04-08" },
    { label: "Thu Apr 9",  ds: "2026-04-09" }, { label: "Fri Apr 10", ds: "2026-04-10" },
    { label: "Sat Apr 11", ds: "2026-04-11" },
  ];

  return (
    <div className="flex bg-slate-50" style={{ height: "calc(100vh - 73px)" }}>
      {/* Left Sidebar */}
      <div className="w-60 border-r border-slate-200 bg-white flex flex-col flex-shrink-0 overflow-y-auto">
        <div className="p-4">
          <button onClick={() => setShowCreate(true)}
            className="w-full flex items-center gap-2 justify-center px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 shadow-sm transition-colors">
            <Plus size={16} /> Create Event
          </button>
        </div>

        {/* Google Calendar badge */}
        <div className="mx-4 mb-3 flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-100 rounded-xl">
          <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
            <Check size={12} className="text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-emerald-800">Google Calendar</p>
            <p className="text-xs text-emerald-600 truncate">basar@openreach.io</p>
          </div>
        </div>

        {/* Mini month */}
        <div className="px-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-slate-800">{monthName} {year}</p>
            <div className="flex gap-1">
              <button onClick={() => navMonth(-1)} className="p-1 hover:bg-slate-100 rounded text-slate-400"><ChevronLeft size={14} /></button>
              <button onClick={() => navMonth(1)} className="p-1 hover:bg-slate-100 rounded text-slate-400"><ChevronRight size={14} /></button>
            </div>
          </div>
          <div className="grid grid-cols-7 text-center">
            {["S","M","T","W","T","F","S"].map((d, i) => (
              <p key={i} className="text-xs text-slate-400 font-medium py-0.5">{d}</p>
            ))}
            {Array.from({ length: firstDay }).map((_, i) => <div key={`b${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const d = i + 1;
              const ds = dateStr(d);
              const hasEv = calendarEvents.some(e => e.date === ds);
              const isToday = ds === todayStr;
              return (
                <button key={d}
                  className={`text-xs py-0.5 rounded-full transition-colors ${isToday ? "bg-blue-600 text-white font-bold" : hasEv ? "text-blue-600 font-semibold hover:bg-blue-50" : "text-slate-600 hover:bg-slate-50"}`}>
                  {d}
                </button>
              );
            })}
          </div>
        </div>

        {/* Upcoming */}
        <div className="px-4 flex-1">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Upcoming</p>
          <div className="space-y-1">
            {upcomingEvents.map(ev => (
              <button key={ev.id} onClick={() => setSelectedEvent(ev)}
                className="w-full flex items-start gap-2 p-2 hover:bg-slate-50 rounded-lg text-left transition-colors">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${ev.color}`} />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-800 truncate">{ev.title}</p>
                  <p className="text-xs text-slate-400">{ev.date.slice(8)} Apr · {ev.startTime}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* My Calendars */}
        <div className="px-4 pb-4 mt-4 border-t border-slate-100 pt-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">My Calendars</p>
          {[
            { label: "Basar K.", color: "bg-blue-500" },
            { label: "OpenReach Team", color: "bg-emerald-500" },
            { label: "Birthdays", color: "bg-pink-400" },
          ].map(c => (
            <label key={c.label} className="flex items-center gap-2 py-1 cursor-pointer">
              <div className={`w-3 h-3 rounded-sm ${c.color} flex-shrink-0`} />
              <span className="text-xs text-slate-700">{c.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Main Calendar Area */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        {/* Toolbar */}
        <div className="px-6 py-3 border-b border-slate-100 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setCurrentDate(new Date(2026, 3, 1))}
              className="px-3 py-1.5 border border-slate-200 text-sm rounded-lg hover:bg-slate-50 text-slate-700">Today</button>
            <div className="flex gap-0.5">
              <button onClick={() => navMonth(-1)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500"><ChevronLeft size={16} /></button>
              <button onClick={() => navMonth(1)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500"><ChevronRight size={16} /></button>
            </div>
            <h2 className="text-lg font-bold text-slate-900">{monthName} {year}</h2>
          </div>
          <div className="flex rounded-lg border border-slate-200 overflow-hidden text-sm">
            {["month", "week"].map(v => (
              <button key={v} onClick={() => setViewMode(v)}
                className={`px-4 py-1.5 capitalize transition-colors ${viewMode === v ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-50"}`}>
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Month View */}
        {viewMode === "month" && (
          <div className="flex-1 flex flex-col overflow-auto">
            <div className="grid grid-cols-7 border-b border-slate-100 flex-shrink-0">
              {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
                <div key={d} className="py-2 text-xs font-semibold text-slate-400 text-center">{d}</div>
              ))}
            </div>
            <div className="flex-1 grid" style={{ gridTemplateRows: `repeat(${Math.ceil((firstDay + daysInMonth) / 7)}, minmax(100px, 1fr))` }}>
              {Array.from({ length: Math.ceil((firstDay + daysInMonth) / 7) }).map((_, wk) => (
                <div key={wk} className="grid grid-cols-7 border-b border-slate-100">
                  {Array.from({ length: 7 }).map((_, di) => {
                    const cell = wk * 7 + di;
                    const day = cell - firstDay + 1;
                    if (day < 1 || day > daysInMonth) {
                      return <div key={di} className="border-r border-slate-50 bg-slate-50/40 p-1.5" />;
                    }
                    const ds = dateStr(day);
                    const dayEvs = eventsForDay(day);
                    const isToday = ds === todayStr;
                    return (
                      <div key={di} className="border-r border-slate-100 p-1.5 hover:bg-slate-50/60 transition-colors min-h-[100px]">
                        <div className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-medium mb-1 ${isToday ? "bg-blue-600 text-white" : "text-slate-700"}`}>
                          {day}
                        </div>
                        <div className="space-y-0.5">
                          {dayEvs.slice(0, 3).map(ev => (
                            <button key={ev.id} onClick={() => setSelectedEvent(ev)}
                              className={`w-full text-left text-xs px-1.5 py-0.5 rounded text-white truncate ${ev.color} hover:opacity-80`}>
                              {ev.startTime} {ev.title}
                            </button>
                          ))}
                          {dayEvs.length > 3 && <p className="text-xs text-slate-400 px-1">+{dayEvs.length - 3} more</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Week View */}
        {viewMode === "week" && (
          <div className="flex-1 overflow-auto p-6">
            <div className="grid grid-cols-7 gap-3">
              {weekDays.map(({ label, ds }) => {
                const dayEvs = calendarEvents.filter(e => e.date === ds);
                const isToday = ds === todayStr;
                return (
                  <div key={ds} className={`border rounded-xl p-3 min-h-[220px] ${isToday ? "border-blue-200 bg-blue-50" : "border-slate-100 bg-white"}`}>
                    <p className={`text-xs font-semibold mb-3 ${isToday ? "text-blue-700" : "text-slate-600"}`}>{label}</p>
                    <div className="space-y-1.5">
                      {dayEvs.map(ev => (
                        <button key={ev.id} onClick={() => setSelectedEvent(ev)}
                          className={`w-full text-left p-2 rounded-lg text-white ${ev.color} text-xs hover:opacity-85 transition-opacity`}>
                          <p className="font-medium truncate">{ev.title}</p>
                          <p className="opacity-80 mt-0.5">{ev.startTime}–{ev.endTime}</p>
                        </button>
                      ))}
                      {dayEvs.length === 0 && <p className="text-xs text-slate-300 mt-2">No events</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Event Detail Panel */}
      {selectedEvent && (
        <div className="w-80 border-l border-slate-100 bg-white flex flex-col flex-shrink-0 overflow-y-auto">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 flex-shrink-0">
            <h3 className="font-semibold text-slate-900 text-sm">Event Details</h3>
            <button onClick={() => setSelectedEvent(null)} className="p-1.5 hover:bg-slate-100 rounded-lg"><X size={15} className="text-slate-500" /></button>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex items-start gap-3">
              <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${selectedEvent.color}`} />
              <div>
                <p className="font-semibold text-slate-900 text-sm leading-tight">{selectedEvent.title}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full text-white mt-1.5 inline-block ${selectedEvent.color}`}>{eventTypeLabel[selectedEvent.type]}</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar size={15} className="text-slate-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-800">{selectedEvent.date}</p>
                <p className="text-xs text-slate-500">{selectedEvent.startTime} – {selectedEvent.endTime}</p>
                {selectedEvent.recurring && <p className="text-xs text-blue-600 mt-0.5">{selectedEvent.recurring}</p>}
              </div>
            </div>
            {selectedEvent.location && (
              <div className="flex items-center gap-3">
                <MapPin size={15} className="text-slate-400 flex-shrink-0" />
                <p className="text-sm text-slate-700">{selectedEvent.location}</p>
              </div>
            )}
            {selectedEvent.googleMeet && (
              <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-xl p-3">
                <Video size={16} className="text-blue-600 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-blue-800">Google Meet</p>
                  <p className="text-xs text-blue-500 truncate">{selectedEvent.googleMeet}</p>
                </div>
                <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 flex-shrink-0 font-medium">Join</button>
              </div>
            )}
            {selectedEvent.attendees && selectedEvent.attendees.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Attendees</p>
                <div className="space-y-1.5">
                  {selectedEvent.attendees.map((att, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs text-white font-bold ${i === 0 ? "bg-blue-500" : "bg-slate-400"}`}>
                        {att[0].toUpperCase()}
                      </div>
                      <p className="text-xs text-slate-700 truncate flex-1">{att}</p>
                      {i === 0 && <span className="text-xs text-slate-400 flex-shrink-0">organizer</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {selectedEvent.description && (
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Description</p>
                <p className="text-sm text-slate-700 leading-relaxed">{selectedEvent.description}</p>
              </div>
            )}
            <div className="flex gap-2 pt-1">
              <button className="flex-1 px-3 py-2 border border-slate-200 text-sm rounded-lg text-slate-700 hover:bg-slate-50">Edit</button>
              <button className="flex-1 px-3 py-2 bg-red-50 border border-red-100 text-sm rounded-lg text-red-600 hover:bg-red-100">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Create Event Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-900">New Event</h2>
              <button onClick={() => setShowCreate(false)} className="p-1.5 hover:bg-slate-100 rounded-lg"><X size={16} className="text-slate-500" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1">Title</label>
                <input className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" placeholder="Event title" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1">Date</label>
                  <input type="date" defaultValue="2026-04-08" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1">Time</label>
                  <input type="time" defaultValue="14:00" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1">Guests</label>
                <input className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" placeholder="Add guests (email)" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1">Location</label>
                <div className="flex gap-2">
                  <input className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" placeholder="Add location or Google Meet" />
                  <button className="px-3 py-2 bg-blue-50 text-blue-700 text-xs border border-blue-100 rounded-lg hover:bg-blue-100 font-medium flex items-center gap-1 whitespace-nowrap">
                    <Video size={12} /> Meet
                  </button>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1">Description</label>
                <textarea rows={3} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Add a description..." />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100">
              <button onClick={() => setShowCreate(false)} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
              <button onClick={() => setShowCreate(false)} className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 font-medium">Save Event</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── CRM: Contact Detail Panel ───────────────────────────────────────────────
function ContactPanel({ deal, onClose, onUpdate }) {
  const [newNote, setNewNote] = useState("");
  const [activeTab, setActiveTab] = useState("activity");
  const [editingValue, setEditingValue] = useState(false);
  const [dealValue, setDealValue] = useState(deal.value);
  const stage = PIPELINE_STAGES.find(s => s.id === deal.stage);
  const activityIcons = {
    message: { icon: MessageSquare, color: "text-blue-500 bg-blue-50" },
    connect: { icon: UserPlus, color: "text-emerald-500 bg-emerald-50" },
    lead:    { icon: Users,         color: "text-slate-500 bg-slate-100" },
    meeting: { icon: Calendar,      color: "text-amber-500 bg-amber-50" },
    note:    { icon: StickyNote,    color: "text-violet-500 bg-violet-50" },
  };

  const addNote = () => {
    if (!newNote.trim()) return;
    onUpdate(deal.id, {
      notes: [...deal.notes, { id: Date.now(), author: "Basar K.", text: newNote, date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }), type: "note" }]
    });
    setNewNote("");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="w-[480px] bg-white h-full shadow-2xl flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="px-5 pt-5 pb-4 border-b border-slate-100">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full ${avatarColor(deal.avatar)} flex items-center justify-center text-sm text-white font-bold flex-shrink-0`}>
                {deal.avatar}
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-lg">{deal.name}</h2>
                <p className="text-sm text-slate-500">{deal.title} · {deal.company}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400"><ExternalLink size={15} /></button>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400"><X size={15} /></button>
            </div>
          </div>

          {/* Stage + Value */}
          <div className="flex items-center gap-3">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${stage?.light} border`}>{stage?.label}</span>
            <div className="flex items-center gap-1 cursor-pointer" onClick={() => setEditingValue(true)}>
              {editingValue ? (
                <input
                  autoFocus type="number" value={dealValue}
                  onChange={e => setDealValue(+e.target.value)}
                  onBlur={() => { setEditingValue(false); onUpdate(deal.id, { value: dealValue }); }}
                  className="w-24 text-sm font-bold text-emerald-700 border-b border-emerald-400 outline-none bg-transparent"
                />
              ) : (
                <span className="text-sm font-bold text-emerald-700">${dealValue.toLocaleString()}</span>
              )}
              <Edit3 size={12} className="text-slate-300" />
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {deal.tags.map(t => (
              <span key={t} className={`text-xs font-medium px-2 py-0.5 rounded-full ${TAG_COLORS[t] || "bg-slate-100 text-slate-600"}`}>{t}</span>
            ))}
            <button className="text-xs px-2 py-0.5 rounded-full border border-dashed border-slate-300 text-slate-400 hover:border-slate-400">+ Tag</button>
          </div>
        </div>

        {/* Contact info */}
        <div className="px-5 py-3 border-b border-slate-100 bg-slate-50">
          <div className="grid grid-cols-2 gap-2 text-sm">
            {[
              { icon: Mail, value: deal.email },
              { icon: Phone, value: deal.phone },
              { icon: MapPin, value: deal.location },
              { icon: Building2, value: deal.company },
              { icon: Zap, value: deal.source },
              { icon: Clock, value: `Last contact: ${deal.lastContact}` },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-center gap-2 text-slate-600">
                  <Icon size={13} className="text-slate-400 flex-shrink-0" />
                  <span className="text-xs truncate">{item.value}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Move stage */}
        <div className="px-5 py-3 border-b border-slate-100">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Move to Stage</p>
          <div className="flex flex-wrap gap-1.5">
            {PIPELINE_STAGES.map(s => (
              <button
                key={s.id}
                onClick={() => onUpdate(deal.id, { stage: s.id })}
                className={`text-xs px-2.5 py-1 rounded-full border font-medium transition-colors ${deal.stage === s.id ? `${s.light} border` : "bg-white border-slate-200 text-slate-500 hover:border-slate-400"}`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100 px-5">
          {[
            { id: "activity", label: "Activity" },
            { id: "notes",    label: `Notes (${deal.notes.length})` },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-1 mr-5 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id ? "border-blue-600 text-blue-600" : "border-transparent text-slate-400 hover:text-slate-600"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {activeTab === "activity" && (
            <div className="space-y-4">
              {deal.activity.map((a, i) => {
                const def = activityIcons[a.type] || activityIcons.note;
                const Icon = def.icon;
                return (
                  <div key={a.id} className="flex gap-3">
                    <div className={`w-7 h-7 rounded-full ${def.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <Icon size={13} />
                    </div>
                    <div className="flex-1 min-w-0 pb-4 border-b border-slate-50 last:border-0">
                      <p className="text-sm text-slate-700">{a.text}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{a.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === "notes" && (
            <div className="space-y-4">
              {deal.notes.map(n => (
                <div key={n.id} className="bg-amber-50 border border-amber-100 rounded-xl p-3">
                  <p className="text-sm text-slate-700">{n.text}</p>
                  <p className="text-xs text-slate-400 mt-2">{n.author} · {n.date}</p>
                </div>
              ))}
              {deal.notes.length === 0 && (
                <p className="text-sm text-slate-400 text-center py-6">No notes yet. Add one below.</p>
              )}
            </div>
          )}
        </div>

        {/* Note input */}
        <div className="px-5 py-4 border-t border-slate-100 bg-slate-50">
          <div className="flex gap-2">
            <textarea
              value={newNote} onChange={e => setNewNote(e.target.value)}
              placeholder="Add a note..."
              rows={2}
              className="flex-1 text-sm px-3 py-2 rounded-lg border border-slate-200 bg-white resize-none outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addNote}
              className={`px-3 rounded-lg text-sm font-medium transition-colors ${newNote.trim() ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-slate-200 text-slate-400"}`}
            >
              Add
            </button>
          </div>
          <div className="flex gap-2 mt-2">
            <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 px-2 py-1 rounded-lg hover:bg-blue-50">
              <Phone size={12} /> Log Call
            </button>
            <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 px-2 py-1 rounded-lg hover:bg-blue-50">
              <Calendar size={12} /> Schedule Meeting
            </button>
            <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 px-2 py-1 rounded-lg hover:bg-blue-50">
              <Mail size={12} /> Send Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CRM: Deal Card ───────────────────────────────────────────────────────────
function DealCard({ deal, onClick }) {
  return (
    <div
      onClick={() => onClick(deal)}
      className="bg-white border border-slate-200 rounded-xl p-3 cursor-pointer hover:border-blue-300 hover:shadow-md transition-all group"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full ${avatarColor(deal.avatar)} flex items-center justify-center text-xs text-white font-bold flex-shrink-0`}>
            {deal.avatar}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">{deal.name}</p>
            <p className="text-xs text-slate-400 truncate">{deal.title}</p>
          </div>
        </div>
        <button className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-slate-100"><MoreHorizontal size={13} className="text-slate-400" /></button>
      </div>
      <div className="mt-2 flex items-center gap-1.5">
        <Building2 size={11} className="text-slate-400" />
        <span className="text-xs text-slate-500">{deal.company}</span>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {deal.tags.slice(0, 2).map(t => (
            <span key={t} className={`text-xs px-1.5 py-0.5 rounded-full ${TAG_COLORS[t] || "bg-slate-100 text-slate-600"}`}>{t}</span>
          ))}
        </div>
        <span className="text-xs font-bold text-emerald-700">${deal.value.toLocaleString()}</span>
      </div>
      <div className="mt-2 flex items-center gap-1 text-xs text-slate-400">
        <Clock size={10} />
        <span>{deal.lastContact}</span>
        {deal.notes.length > 0 && (
          <><StickyNote size={10} className="ml-2" /><span>{deal.notes.length}</span></>
        )}
      </div>
    </div>
  );
}

// ─── CRM Page ─────────────────────────────────────────────────────────────────
function CRMPage() {
  const [deals, setDeals] = useState(crmDeals);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [view, setView] = useState("kanban"); // "kanban" | "list"
  const [search, setSearch] = useState("");

  const updateDeal = (id, changes) => {
    setDeals(prev => prev.map(d => d.id === id ? { ...d, ...changes } : d));
    if (selectedDeal?.id === id) setSelectedDeal(prev => ({ ...prev, ...changes }));
  };

  const filtered = deals.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.company.toLowerCase().includes(search.toLowerCase())
  );

  const totalValue = deals.filter(d => d.stage !== "lost").reduce((s, d) => s + d.value, 0);
  const wonValue   = deals.filter(d => d.stage === "won").reduce((s, d) => s + d.value, 0);
  const activeCount = deals.filter(d => !["won","lost"].includes(d.stage)).length;

  return (
    <div className="flex flex-col h-full">
      {/* Sub-header */}
      <div className="px-6 py-4 bg-white border-b border-slate-100 flex items-center gap-4">
        {/* KPIs */}
        <div className="flex gap-6 flex-1">
          {[
            { label: "Pipeline Value", value: `$${(totalValue/1000).toFixed(0)}k`, color: "text-blue-600" },
            { label: "Won Value",      value: `$${(wonValue/1000).toFixed(0)}k`,   color: "text-emerald-600" },
            { label: "Active Deals",   value: activeCount,                          color: "text-violet-600" },
            { label: "Win Rate",       value: "62%",                                color: "text-amber-600" },
          ].map(k => (
            <div key={k.label}>
              <p className="text-xs text-slate-400">{k.label}</p>
              <p className={`text-xl font-bold ${k.color}`}>{k.value}</p>
            </div>
          ))}
        </div>
        {/* Controls */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search deals..." className="pl-8 pr-3 py-2 text-sm bg-slate-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 w-44" />
          </div>
          <div className="flex rounded-lg border border-slate-200 overflow-hidden">
            <button onClick={() => setView("kanban")} className={`px-3 py-2 text-sm flex items-center gap-1.5 ${view === "kanban" ? "bg-blue-600 text-white" : "bg-white text-slate-500 hover:bg-slate-50"}`}>
              <Layers size={14} /> Board
            </button>
            <button onClick={() => setView("list")} className={`px-3 py-2 text-sm flex items-center gap-1.5 ${view === "list" ? "bg-blue-600 text-white" : "bg-white text-slate-500 hover:bg-slate-50"}`}>
              <FileText size={14} /> List
            </button>
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
            <Plus size={14} /> Add Deal
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      {view === "kanban" && (
        <div className="flex-1 overflow-x-auto p-5">
          <div className="flex gap-4 h-full min-w-max">
            {PIPELINE_STAGES.map(stage => {
              const stageDeals = filtered.filter(d => d.stage === stage.id);
              const stageValue = stageDeals.reduce((s, d) => s + d.value, 0);
              return (
                <div key={stage.id} className="w-64 flex flex-col">
                  {/* Column header */}
                  <div className="flex items-center justify-between mb-3 px-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${stage.color}`} />
                      <span className="text-sm font-semibold text-slate-700">{stage.label}</span>
                      <span className="text-xs bg-slate-200 text-slate-600 rounded-full px-1.5 py-0.5 font-medium">{stageDeals.length}</span>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">${(stageValue/1000).toFixed(1)}k</span>
                  </div>

                  {/* Cards */}
                  <div className="flex-1 space-y-2.5 min-h-[200px] p-2 rounded-xl bg-slate-100/60">
                    {stageDeals.map(d => (
                      <DealCard key={d.id} deal={d} onClick={setSelectedDeal} />
                    ))}
                    {stageDeals.length === 0 && (
                      <div className="flex items-center justify-center h-20 text-xs text-slate-300">No deals</div>
                    )}
                    <button className="w-full py-2 text-xs text-slate-400 hover:text-blue-600 flex items-center justify-center gap-1 hover:bg-white rounded-lg transition-colors">
                      <Plus size={13} /> Add Deal
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* List View */}
      {view === "list" && (
        <div className="flex-1 overflow-y-auto p-5">
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {["Contact", "Company", "Stage", "Value", "Tags", "Last Contact", ""].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(d => {
                  const stage = PIPELINE_STAGES.find(s => s.id === d.stage);
                  return (
                    <tr key={d.id} onClick={() => setSelectedDeal(d)} className="border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full ${avatarColor(d.avatar)} flex items-center justify-center text-xs text-white font-bold`}>{d.avatar}</div>
                          <div>
                            <p className="text-sm font-medium text-slate-800">{d.name}</p>
                            <p className="text-xs text-slate-400">{d.title}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600 font-medium">{d.company}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${stage?.light} border`}>{stage?.label}</span>
                      </td>
                      <td className="px-4 py-3 text-sm font-bold text-emerald-700">${d.value.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1 flex-wrap">
                          {d.tags.map(t => (
                            <span key={t} className={`text-xs px-1.5 py-0.5 rounded-full ${TAG_COLORS[t] || "bg-slate-100 text-slate-600"}`}>{t}</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-400">{d.lastContact}</td>
                      <td className="px-4 py-3">
                        <button className="p-1 rounded hover:bg-slate-100"><MoreHorizontal size={15} className="text-slate-400" /></button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Contact Detail Panel */}
      {selectedDeal && (
        <ContactPanel
          deal={selectedDeal}
          onClose={() => setSelectedDeal(null)}
          onUpdate={updateDeal}
        />
      )}
    </div>
  );
}

// ─── Shared: Outreach Activity Icon Map ──────────────────────────────────────
const activityDefs = {
  connect: { icon: UserPlus,      bg: "bg-emerald-50", fg: "text-emerald-600", label: "Connection" },
  message: { icon: MessageSquare, bg: "bg-blue-50",    fg: "text-blue-600",    label: "Message" },
  meeting: { icon: Calendar,      bg: "bg-amber-50",   fg: "text-amber-600",   label: "Meeting" },
  note:    { icon: StickyNote,    bg: "bg-violet-50",  fg: "text-violet-600",  label: "Note" },
  call:    { icon: Phone,         bg: "bg-cyan-50",    fg: "text-cyan-600",    label: "Call" },
  email:   { icon: Mail,          bg: "bg-pink-50",    fg: "text-pink-600",    label: "Email" },
  deal:    { icon: Briefcase,     bg: "bg-indigo-50",  fg: "text-indigo-600",  label: "Deal" },
};
function ActivityDot({ type }) {
  const def = activityDefs[type] || activityDefs.note;
  const Icon = def.icon;
  return (
    <div className={`w-7 h-7 rounded-full ${def.bg} flex items-center justify-center flex-shrink-0`}>
      <Icon size={13} className={def.fg} />
    </div>
  );
}

// ─── Contacts: Detail Drawer ──────────────────────────────────────────────────
function ContactDrawer({ contact, onClose, onUpdate }) {
  const [tab, setTab] = useState("overview");
  const [newNote, setNewNote] = useState("");
  const [newTask, setNewTask] = useState("");
  const [contactData, setContactData] = useState(contact);
  const company = companies.find(c => c.id === contact.companyId);

  const addNote = () => {
    if (!newNote.trim()) return;
    const updated = {
      ...contactData,
      notes: [...contactData.notes, {
        id: Date.now(), author: "Basar K.", text: newNote,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      }],
    };
    setContactData(updated);
    onUpdate(updated);
    setNewNote("");
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const updated = {
      ...contactData,
      tasks: [...contactData.tasks, { id: Date.now(), text: newTask, done: false, due: "TBD" }],
    };
    setContactData(updated);
    onUpdate(updated);
    setNewTask("");
  };

  const toggleTask = (id) => {
    const updated = { ...contactData, tasks: contactData.tasks.map(t => t.id === id ? { ...t, done: !t.done } : t) };
    setContactData(updated);
    onUpdate(updated);
  };

  const TABS = [
    { id: "overview",  label: "Overview" },
    { id: "outreach",  label: `Outreach (${contactData.outreach.length})` },
    { id: "notes",     label: `Notes (${contactData.notes.length})` },
    { id: "tasks",     label: `Tasks (${contactData.tasks.length})` },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="w-[520px] bg-white h-full shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl ${avatarColor(contactData.avatar)} flex items-center justify-center text-lg text-white font-bold shadow-md`}>
                {contactData.avatar}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">{contactData.name}</h2>
                <p className="text-sm text-slate-500 mt-0.5">{contactData.title}</p>
                {company && (
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className={`w-4 h-4 rounded ${company.logoColor} flex items-center justify-center text-white text-xs font-bold`}>{company.logo}</div>
                    <span className="text-sm font-medium text-slate-700">{contactData.company}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-1">
              <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 text-xs">
                <ExternalLink size={14} />
              </button>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400">
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Status + Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CONTACT_STATUS_COLORS[contactData.status]}`}>
              {contactData.status}
            </span>
            {contactData.tags.map(t => (
              <span key={t} className={`text-xs px-2 py-0.5 rounded-full ${TAG_COLORS[t] || "bg-slate-100 text-slate-600"}`}>{t}</span>
            ))}
            <button className="text-xs px-2 py-0.5 rounded-full border border-dashed border-slate-300 text-slate-400 hover:border-slate-400">+ Tag</button>
          </div>

          {/* Quick contact info */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-4">
            {[
              { icon: AtSign, value: contactData.email },
              { icon: Phone,  value: contactData.phone },
              { icon: MapPin, value: contactData.location },
              { icon: Calendar, value: `Added ${contactData.addedDate}` },
              { icon: Zap,    value: contactData.campaign },
              { icon: Clock,  value: `Last contact: ${contactData.lastContact}` },
            ].map((row, i) => {
              const Icon = row.icon;
              return (
                <div key={i} className="flex items-center gap-2">
                  <Icon size={12} className="text-slate-400 flex-shrink-0" />
                  <span className="text-xs text-slate-600 truncate">{row.value}</span>
                </div>
              );
            })}
          </div>

          {/* Social links */}
          <div className="flex gap-2 mt-3">
            {contactData.linkedin && (
              <button className="flex items-center gap-1.5 text-xs text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full hover:bg-blue-100">
                <Linkedin size={11} /> LinkedIn
              </button>
            )}
            {contactData.twitter && (
              <button className="flex items-center gap-1.5 text-xs text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full hover:bg-sky-100">
                <Twitter size={11} /> {contactData.twitter}
              </button>
            )}
          </div>
        </div>

        {/* Deal snapshot bar */}
        {contactData.dealValue > 0 && (
          <div className="px-6 py-3 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase size={14} className="text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-800">Deal: ${contactData.dealValue.toLocaleString()}</span>
            </div>
            <span className="text-xs font-medium bg-white px-2 py-1 rounded-full text-emerald-700 border border-emerald-200 capitalize">
              {contactData.dealStage}
            </span>
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b border-slate-100 px-6 bg-white overflow-x-auto">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`py-3 px-1 mr-5 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${tab === t.id ? "border-blue-600 text-blue-600" : "border-transparent text-slate-400 hover:text-slate-600"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab body */}
        <div className="flex-1 overflow-y-auto">

          {/* OVERVIEW */}
          {tab === "overview" && (
            <div className="p-6 space-y-5">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Outreach Steps", value: contactData.outreach.length, color: "text-blue-600" },
                  { label: "Notes",           value: contactData.notes.length,   color: "text-violet-600" },
                  { label: "Open Tasks",      value: contactData.tasks.filter(t => !t.done).length, color: "text-amber-600" },
                ].map(s => (
                  <div key={s.label} className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                    <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Recent activity */}
              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Recent Activity</h3>
                <div className="space-y-3">
                  {contactData.outreach.slice(-4).reverse().map((a, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <ActivityDot type={a.type} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-700">{a.text}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{a.date} · {a.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Open tasks preview */}
              {contactData.tasks.filter(t => !t.done).length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-3">Open Tasks</h3>
                  <div className="space-y-2">
                    {contactData.tasks.filter(t => !t.done).map(t => (
                      <div key={t.id} className="flex items-center gap-2 bg-amber-50 rounded-lg px-3 py-2">
                        <button onClick={() => toggleTask(t.id)} className="flex-shrink-0">
                          <Circle size={15} className="text-amber-400" />
                        </button>
                        <span className="text-sm text-slate-700 flex-1">{t.text}</span>
                        <span className="text-xs text-amber-600 font-medium">{t.due}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick actions */}
              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Quick Actions</h3>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { icon: MessageSquare, label: "Send Message", color: "text-blue-600 bg-blue-50 hover:bg-blue-100" },
                    { icon: Calendar,      label: "Book Meeting", color: "text-amber-600 bg-amber-50 hover:bg-amber-100" },
                    { icon: Phone,         label: "Log Call",     color: "text-emerald-600 bg-emerald-50 hover:bg-emerald-100" },
                    { icon: Mail,          label: "Send Email",   color: "text-pink-600 bg-pink-50 hover:bg-pink-100" },
                    { icon: Briefcase,     label: "Add Deal",     color: "text-violet-600 bg-violet-50 hover:bg-violet-100" },
                    { icon: StickyNote,    label: "Add Note",     color: "text-slate-600 bg-slate-100 hover:bg-slate-200" },
                  ].map(a => {
                    const Icon = a.icon;
                    return (
                      <button key={a.label} onClick={() => { if (a.label === "Add Note") setTab("notes"); }} className={`flex flex-col items-center gap-1.5 py-3 rounded-xl text-xs font-medium transition-colors ${a.color}`}>
                        <Icon size={16} />
                        {a.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* OUTREACH */}
          {tab === "outreach" && (
            <div className="p-6">
              <div className="space-y-1">
                {contactData.outreach.map((a, i) => (
                  <div key={i} className="flex gap-3 pb-4 relative">
                    {i < contactData.outreach.length - 1 && (
                      <div className="absolute left-3.5 top-7 bottom-0 w-px bg-slate-100" />
                    )}
                    <ActivityDot type={a.type} />
                    <div className="flex-1 min-w-0 pt-0.5">
                      <p className="text-sm font-medium text-slate-800">{a.text}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{a.date} · {a.time}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5 ${
                      activityDefs[a.type]?.bg || "bg-slate-100"
                    } ${activityDefs[a.type]?.fg || "text-slate-600"}`}>
                      {activityDefs[a.type]?.label || a.type}
                    </span>
                  </div>
                ))}
              </div>
              <button className="mt-2 w-full py-2.5 border-2 border-dashed border-slate-200 rounded-xl text-sm text-slate-400 hover:border-blue-300 hover:text-blue-500 transition-colors flex items-center justify-center gap-2">
                <Plus size={14} /> Log Activity
              </button>
            </div>
          )}

          {/* NOTES */}
          {tab === "notes" && (
            <div className="p-6 space-y-4">
              {contactData.notes.map(n => (
                <div key={n.id} className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                  <p className="text-sm text-slate-800">{n.text}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-slate-400">{n.author} · {n.date}</p>
                    <button className="text-slate-300 hover:text-red-400"><Trash2 size={12} /></button>
                  </div>
                </div>
              ))}
              {contactData.notes.length === 0 && <p className="text-sm text-slate-400 text-center py-6">No notes yet.</p>}
              <div className="flex gap-2 mt-2">
                <textarea value={newNote} onChange={e => setNewNote(e.target.value)} placeholder="Write a note..." rows={3} className="flex-1 text-sm px-3 py-2 border border-slate-200 rounded-xl resize-none outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                <button onClick={addNote} className={`px-3 rounded-xl text-sm font-medium self-end pb-2 ${newNote.trim() ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-slate-200 text-slate-400"}`}>Save</button>
              </div>
            </div>
          )}

          {/* TASKS */}
          {tab === "tasks" && (
            <div className="p-6 space-y-3">
              {contactData.tasks.map(t => (
                <div key={t.id} className={`flex items-center gap-3 p-3 rounded-xl border ${t.done ? "bg-slate-50 border-slate-100 opacity-60" : "bg-white border-slate-200"}`}>
                  <button onClick={() => toggleTask(t.id)} className="flex-shrink-0">
                    {t.done
                      ? <CheckCircle size={18} className="text-emerald-500" />
                      : <Circle size={18} className="text-slate-300" />
                    }
                  </button>
                  <span className={`text-sm flex-1 ${t.done ? "line-through text-slate-400" : "text-slate-700"}`}>{t.text}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${t.done ? "bg-slate-100 text-slate-400" : "bg-amber-100 text-amber-700"}`}>{t.due}</span>
                </div>
              ))}
              {contactData.tasks.length === 0 && <p className="text-sm text-slate-400 text-center py-6">No tasks yet.</p>}
              <div className="flex gap-2 mt-2">
                <input value={newTask} onChange={e => setNewTask(e.target.value)} placeholder="Add a task..." onKeyDown={e => e.key === "Enter" && addTask()} className="flex-1 text-sm px-3 py-2 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
                <button onClick={addTask} className="px-4 py-2 bg-blue-600 text-white text-sm rounded-xl hover:bg-blue-700">Add</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Contacts Page ────────────────────────────────────────────────────────────
function ContactsPage() {
  const [contactList, setContactList] = useState(contacts);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState("table"); // "table" | "cards"

  const updateContact = (updated) => setContactList(prev => prev.map(c => c.id === updated.id ? updated : c));

  const filtered = contactList.filter(c => {
    const q = search.toLowerCase();
    const matchSearch = c.name.toLowerCase().includes(q) || c.company.toLowerCase().includes(q) || c.title.toLowerCase().includes(q);
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalOutreach = contactList.reduce((s, c) => s + c.outreach.length, 0);
  const withReply = contactList.filter(c => c.outreach.some(o => o.type === "message" && o.text.includes("Replied"))).length;
  const openTasks = contactList.reduce((s, c) => s + c.tasks.filter(t => !t.done).length, 0);

  return (
    <div className="flex flex-col h-full">
      {/* Sub-header KPIs */}
      <div className="px-6 py-4 bg-white border-b border-slate-100 flex items-center gap-6">
        <div className="flex gap-8 flex-1">
          {[
            { label: "Total Contacts", value: contactList.length, color: "text-blue-600" },
            { label: "Total Outreach", value: totalOutreach,       color: "text-violet-600" },
            { label: "With Reply",     value: withReply,           color: "text-emerald-600" },
            { label: "Open Tasks",     value: openTasks,           color: "text-amber-600" },
          ].map(k => (
            <div key={k.label}>
              <p className="text-xs text-slate-400">{k.label}</p>
              <p className={`text-xl font-bold ${k.color}`}>{k.value}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search contacts…" className="pl-8 pr-3 py-2 text-sm bg-slate-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 w-48" />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="text-sm px-3 py-2 border border-slate-200 rounded-lg bg-white outline-none">
            <option value="all">All Statuses</option>
            <option value="customer">Customer</option>
            <option value="prospect">Prospect</option>
            <option value="cold">Cold</option>
            <option value="lost">Lost</option>
          </select>
          <div className="flex rounded-lg border border-slate-200 overflow-hidden">
            <button onClick={() => setViewMode("table")} className={`px-3 py-2 text-sm ${viewMode === "table" ? "bg-blue-600 text-white" : "bg-white text-slate-500 hover:bg-slate-50"}`}><FileText size={14} /></button>
            <button onClick={() => setViewMode("cards")} className={`px-3 py-2 text-sm ${viewMode === "cards" ? "bg-blue-600 text-white" : "bg-white text-slate-500 hover:bg-slate-50"}`}><Layers size={14} /></button>
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
            <Plus size={14} /> Add Contact
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        {/* TABLE VIEW */}
        {viewMode === "table" && (
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {["Contact", "Title", "Company", "Status", "Tags", "Last Contact", "Outreach", "Deal Value", ""].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(c => {
                  const comp = companies.find(co => co.id === c.companyId);
                  return (
                    <tr key={c.id} onClick={() => setSelected(c)} className="border-b border-slate-50 hover:bg-blue-50/30 cursor-pointer transition-colors group">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full ${avatarColor(c.avatar)} flex items-center justify-center text-xs text-white font-bold flex-shrink-0`}>{c.avatar}</div>
                          <div>
                            <p className="text-sm font-semibold text-slate-800">{c.name}</p>
                            <p className="text-xs text-slate-400">{c.location}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">{c.title}</td>
                      <td className="px-4 py-3">
                        {comp && (
                          <div className="flex items-center gap-1.5">
                            <div className={`w-5 h-5 rounded ${comp.logoColor} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>{comp.logo}</div>
                            <span className="text-sm text-slate-700 font-medium">{c.company}</span>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${CONTACT_STATUS_COLORS[c.status]}`}>{c.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1 flex-wrap">
                          {c.tags.slice(0, 2).map(t => (
                            <span key={t} className={`text-xs px-1.5 py-0.5 rounded-full ${TAG_COLORS[t] || "bg-slate-100 text-slate-600"}`}>{t}</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-400 whitespace-nowrap">{c.lastContact}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <div className="flex gap-0.5">
                            {c.outreach.map((_, i) => (
                              <div key={i} className={`w-1.5 h-5 rounded-sm ${
                                i === 0 ? "bg-blue-400" :
                                i === 1 ? "bg-emerald-400" :
                                i === 2 ? "bg-violet-400" : "bg-amber-400"
                              }`} />
                            ))}
                          </div>
                          <span className="text-xs text-slate-400">{c.outreach.length}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm font-bold text-emerald-700">
                        {c.dealValue > 0 ? `$${c.dealValue.toLocaleString()}` : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <button className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-slate-200"><MoreHorizontal size={14} className="text-slate-400" /></button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
              <p className="text-xs text-slate-400">{filtered.length} of {contactList.length} contacts</p>
              <div className="flex gap-1">
                <button className="px-2 py-1 text-xs rounded border border-slate-200 text-slate-400">Previous</button>
                <button className="px-2 py-1 text-xs rounded border border-blue-500 bg-blue-50 text-blue-600">1</button>
                <button className="px-2 py-1 text-xs rounded border border-slate-200 text-slate-400">Next</button>
              </div>
            </div>
          </div>
        )}

        {/* CARDS VIEW */}
        {viewMode === "cards" && (
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map(c => {
              const comp = companies.find(co => co.id === c.companyId);
              return (
                <div key={c.id} onClick={() => setSelected(c)} className="bg-white rounded-xl border border-slate-200 p-4 cursor-pointer hover:border-blue-300 hover:shadow-md transition-all group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-xl ${avatarColor(c.avatar)} flex items-center justify-center text-sm text-white font-bold`}>{c.avatar}</div>
                      <div>
                        <p className="font-semibold text-slate-800">{c.name}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{c.title}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CONTACT_STATUS_COLORS[c.status]}`}>{c.status}</span>
                  </div>
                  {comp && (
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className={`w-5 h-5 rounded ${comp.logoColor} flex items-center justify-center text-white text-xs font-bold`}>{comp.logo}</div>
                      <span className="text-sm text-slate-600 font-medium">{c.company}</span>
                      <span className="text-xs text-slate-400">· {c.location}</span>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {c.tags.map(t => <span key={t} className={`text-xs px-1.5 py-0.5 rounded-full ${TAG_COLORS[t] || "bg-slate-100 text-slate-600"}`}>{t}</span>)}
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-50 pt-3 mt-3">
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><Activity size={11} />{c.outreach.length} steps</span>
                      <span className="flex items-center gap-1"><StickyNote size={11} />{c.notes.length}</span>
                      <span className="flex items-center gap-1"><CheckSquare size={11} />{c.tasks.filter(t => !t.done).length}</span>
                    </div>
                    {c.dealValue > 0 && <span className="text-xs font-bold text-emerald-700">${c.dealValue.toLocaleString()}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selected && (
        <ContactDrawer
          contact={selected}
          onClose={() => setSelected(null)}
          onUpdate={updateContact}
        />
      )}
    </div>
  );
}

// ─── Company Detail Drawer ────────────────────────────────────────────────────
function CompanyDrawer({ company, allContacts, onClose }) {
  const [tab, setTab] = useState("contacts");
  const [newNote, setNewNote] = useState("");
  const [companyData, setCompanyData] = useState(company);
  const compContacts = allContacts.filter(c => c.companyId === company.id);
  const totalDealValue = compContacts.reduce((s, c) => s + c.dealValue, 0);
  const totalOutreach  = compContacts.reduce((s, c) => s + c.outreach.length, 0);

  const addNote = () => {
    if (!newNote.trim()) return;
    setCompanyData(prev => ({
      ...prev,
      notes: [...prev.notes, { id: Date.now(), author: "Basar K.", text: newNote, date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) }],
    }));
    setNewNote("");
  };

  const TABS = [
    { id: "contacts", label: `Contacts (${compContacts.length})` },
    { id: "activity", label: "Activity" },
    { id: "notes",    label: `Notes (${companyData.notes.length})` },
  ];

  const allActivity = compContacts.flatMap(c => c.outreach.map(o => ({ ...o, contactName: c.name, contactAvatar: c.avatar }))).sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="w-[520px] bg-white h-full shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-100">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl ${company.logoColor} flex items-center justify-center text-2xl text-white font-bold shadow-md`}>
                {company.logo}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">{company.name}</h2>
                <p className="text-sm text-slate-500 mt-0.5">{company.industry}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <Globe size={12} className="text-slate-400" />
                  <span className="text-xs text-blue-600">{company.website}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-1">
              <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400"><ExternalLink size={14} /></button>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400"><X size={14} /></button>
            </div>
          </div>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${COMPANY_STATUS_COLORS[company.status]}`}>{company.status}</span>

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-4">
            {[
              { label: "Size",      value: company.size },
              { label: "Revenue",   value: company.revenue },
              { label: "Founded",   value: company.founded },
              { label: "Location",  value: company.location },
            ].map(row => (
              <div key={row.label}>
                <p className="text-xs text-slate-400">{row.label}</p>
                <p className="text-sm font-medium text-slate-700">{row.value}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-500 mt-3 leading-relaxed">{company.description}</p>
        </div>

        {/* KPI strip */}
        <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100 bg-slate-50">
          {[
            { label: "Contacts",  value: compContacts.length,        color: "text-blue-600" },
            { label: "Deal Value",value: `$${(totalDealValue/1000).toFixed(0)}k`, color: "text-emerald-600" },
            { label: "Touchpoints", value: totalOutreach,            color: "text-violet-600" },
          ].map(k => (
            <div key={k.label} className="p-3 text-center">
              <p className={`text-xl font-bold ${k.color}`}>{k.value}</p>
              <p className="text-xs text-slate-400">{k.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100 px-6">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`py-3 px-1 mr-5 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${tab === t.id ? "border-blue-600 text-blue-600" : "border-transparent text-slate-400 hover:text-slate-600"}`}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* CONTACTS */}
          {tab === "contacts" && (
            <div className="p-5 space-y-3">
              {compContacts.map(c => (
                <div key={c.id} className="flex items-center gap-3 bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <div className={`w-10 h-10 rounded-full ${avatarColor(c.avatar)} flex items-center justify-center text-xs text-white font-bold flex-shrink-0`}>{c.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800">{c.name}</p>
                    <p className="text-xs text-slate-400">{c.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${CONTACT_STATUS_COLORS[c.status]}`}>{c.status}</span>
                      <span className="text-xs text-slate-400">{c.outreach.length} touchpoints</span>
                    </div>
                  </div>
                  {c.dealValue > 0 && <span className="text-sm font-bold text-emerald-700">${c.dealValue.toLocaleString()}</span>}
                </div>
              ))}
              {compContacts.length === 0 && <p className="text-sm text-slate-400 text-center py-8">No contacts at this company yet.</p>}
            </div>
          )}

          {/* ACTIVITY */}
          {tab === "activity" && (
            <div className="p-5 space-y-3">
              {allActivity.slice(0, 15).map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <ActivityDot type={a.type} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full ${avatarColor(a.contactAvatar)} flex items-center justify-center text-xs text-white font-bold flex-shrink-0`}>{a.contactAvatar}</div>
                      <p className="text-xs font-medium text-slate-600">{a.contactName}</p>
                    </div>
                    <p className="text-sm text-slate-700 mt-0.5">{a.text}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{a.date} · {a.time}</p>
                  </div>
                </div>
              ))}
              {allActivity.length === 0 && <p className="text-sm text-slate-400 text-center py-8">No activity yet.</p>}
            </div>
          )}

          {/* NOTES */}
          {tab === "notes" && (
            <div className="p-5 space-y-4">
              {companyData.notes.map(n => (
                <div key={n.id} className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                  <p className="text-sm text-slate-800">{n.text}</p>
                  <p className="text-xs text-slate-400 mt-2">{n.author} · {n.date}</p>
                </div>
              ))}
              {companyData.notes.length === 0 && <p className="text-sm text-slate-400 text-center py-6">No notes yet.</p>}
              <div className="flex gap-2 mt-2">
                <textarea value={newNote} onChange={e => setNewNote(e.target.value)} placeholder="Add a company note…" rows={3} className="flex-1 text-sm px-3 py-2 border border-slate-200 rounded-xl resize-none outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                <button onClick={addNote} className={`px-3 self-end pb-2 rounded-xl text-sm font-medium ${newNote.trim() ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-slate-200 text-slate-400"}`}>Save</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Companies Page ───────────────────────────────────────────────────────────
function CompaniesPage() {
  const [contactList] = useState(contacts);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [viewMode, setViewMode] = useState("cards");

  const industries = ["all", ...Array.from(new Set(companies.map(c => c.industry)))];

  const filtered = companies.filter(c => {
    const q = search.toLowerCase();
    const matchSearch = c.name.toLowerCase().includes(q) || c.industry.toLowerCase().includes(q);
    const matchIndustry = industryFilter === "all" || c.industry === industryFilter;
    return matchSearch && matchIndustry;
  });

  const totalPipeline = companies.reduce((s, c) => {
    return s + contactList.filter(ct => ct.companyId === c.id).reduce((ss, ct) => ss + ct.dealValue, 0);
  }, 0);

  return (
    <div className="flex flex-col h-full">
      {/* Sub-header */}
      <div className="px-6 py-4 bg-white border-b border-slate-100 flex items-center gap-6">
        <div className="flex gap-8 flex-1">
          {[
            { label: "Total Companies", value: companies.length,             color: "text-blue-600" },
            { label: "Pipeline Value",  value: `$${(totalPipeline/1000).toFixed(0)}k`, color: "text-emerald-600" },
            { label: "Customers",       value: companies.filter(c => c.status === "customer").length,  color: "text-violet-600" },
            { label: "Prospects",       value: companies.filter(c => c.status === "prospect").length,  color: "text-amber-600" },
          ].map(k => (
            <div key={k.label}>
              <p className="text-xs text-slate-400">{k.label}</p>
              <p className={`text-xl font-bold ${k.color}`}>{k.value}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search companies…" className="pl-8 pr-3 py-2 text-sm bg-slate-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 w-48" />
          </div>
          <select value={industryFilter} onChange={e => setIndustryFilter(e.target.value)} className="text-sm px-3 py-2 border border-slate-200 rounded-lg bg-white outline-none">
            {industries.map(ind => <option key={ind} value={ind}>{ind === "all" ? "All Industries" : ind}</option>)}
          </select>
          <div className="flex rounded-lg border border-slate-200 overflow-hidden">
            <button onClick={() => setViewMode("cards")} className={`px-3 py-2 text-sm ${viewMode === "cards" ? "bg-blue-600 text-white" : "bg-white text-slate-500 hover:bg-slate-50"}`}><Layers size={14} /></button>
            <button onClick={() => setViewMode("table")} className={`px-3 py-2 text-sm ${viewMode === "table" ? "bg-blue-600 text-white" : "bg-white text-slate-500 hover:bg-slate-50"}`}><FileText size={14} /></button>
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
            <Plus size={14} /> Add Company
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        {/* CARDS */}
        {viewMode === "cards" && (
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map(co => {
              const compContacts = contactList.filter(c => c.companyId === co.id);
              const dealValue    = compContacts.reduce((s, c) => s + c.dealValue, 0);
              const touchpoints  = compContacts.reduce((s, c) => s + c.outreach.length, 0);
              return (
                <div key={co.id} onClick={() => setSelected(co)} className="bg-white rounded-xl border border-slate-200 p-5 cursor-pointer hover:border-blue-300 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl ${co.logoColor} flex items-center justify-center text-xl text-white font-bold shadow-sm`}>{co.logo}</div>
                      <div>
                        <p className="font-bold text-slate-900">{co.name}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{co.industry}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${COMPANY_STATUS_COLORS[co.status]}`}>{co.status}</span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-4">{co.description}</p>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                    <span className="flex items-center gap-1"><MapPin size={11} />{co.location}</span>
                    <span className="flex items-center gap-1"><UsersRound size={11} />{co.size}</span>
                  </div>
                  <div className="border-t border-slate-50 pt-3 grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-base font-bold text-blue-600">{compContacts.length}</p>
                      <p className="text-xs text-slate-400">Contacts</p>
                    </div>
                    <div>
                      <p className="text-base font-bold text-emerald-600">{dealValue > 0 ? `$${(dealValue/1000).toFixed(0)}k` : "—"}</p>
                      <p className="text-xs text-slate-400">Deal Value</p>
                    </div>
                    <div>
                      <p className="text-base font-bold text-violet-600">{touchpoints}</p>
                      <p className="text-xs text-slate-400">Touchpoints</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TABLE */}
        {viewMode === "table" && (
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {["Company", "Industry", "Size", "Status", "Contacts", "Deal Value", "Touchpoints", ""].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(co => {
                  const compContacts = contactList.filter(c => c.companyId === co.id);
                  const dealValue    = compContacts.reduce((s, c) => s + c.dealValue, 0);
                  const touchpoints  = compContacts.reduce((s, c) => s + c.outreach.length, 0);
                  return (
                    <tr key={co.id} onClick={() => setSelected(co)} className="border-b border-slate-50 hover:bg-blue-50/30 cursor-pointer transition-colors group">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-lg ${co.logoColor} flex items-center justify-center text-sm text-white font-bold`}>{co.logo}</div>
                          <div>
                            <p className="text-sm font-semibold text-slate-800">{co.name}</p>
                            <p className="text-xs text-blue-500">{co.website}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">{co.industry}</td>
                      <td className="px-4 py-3 text-sm text-slate-500">{co.size}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${COMPANY_STATUS_COLORS[co.status]}`}>{co.status}</span>
                      </td>
                      <td className="px-4 py-3 text-sm font-bold text-blue-600">{compContacts.length}</td>
                      <td className="px-4 py-3 text-sm font-bold text-emerald-700">{dealValue > 0 ? `$${dealValue.toLocaleString()}` : "—"}</td>
                      <td className="px-4 py-3 text-sm text-violet-600 font-medium">{touchpoints}</td>
                      <td className="px-4 py-3">
                        <button className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-slate-200"><MoreHorizontal size={14} className="text-slate-400" /></button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && (
        <CompanyDrawer
          company={selected}
          allContacts={contactList}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [authScreen, setAuthScreen] = useState("login"); // "login" | "signup" | "forgot"
  const [user, setUser] = useState(() => loadSession());

  function handleLogin(session) {
    setUser(session);
    setAuthScreen("login");
  }

  function handleLogout() {
    clearSession();
    setUser(null);
    setAuthScreen("login");
  }

  // ── Not authenticated — show auth screens ─────────────────────────────────
  if (!user) {
    if (authScreen === "signup")  return <SignupPage onLogin={handleLogin} onGoLogin={() => setAuthScreen("login")} />;
    if (authScreen === "forgot")  return <ForgotPasswordPage onGoLogin={() => setAuthScreen("login")} />;
    return (
      <LoginPage
        onLogin={handleLogin}
        onGoSignup={() => setAuthScreen("signup")}
        onGoForgot={() => setAuthScreen("forgot")}
      />
    );
  }

  // ── Authenticated — show the app ──────────────────────────────────────────
  const pages = {
    dashboard: { title: "Dashboard",  subtitle: `Welcome back, ${user.name.split(" ")[0]} 👋`,  component: <Dashboard /> },
    campaigns: { title: "Campaigns",  subtitle: "Manage your outreach sequences",               component: <CampaignsPage /> },
    leads:     { title: "Leads",      subtitle: "Your LinkedIn prospects",                       component: <LeadsPage /> },
    contacts:  { title: "Contacts",   subtitle: "All people you're in touch with",               component: <ContactsPage /> },
    companies: { title: "Companies",  subtitle: "Organisations in your network",                 component: <CompaniesPage /> },
    crm:       { title: "CRM",        subtitle: "Pipeline & deal management",                    component: <CRMPage /> },
    inbox:     { title: "Inbox",      subtitle: "LinkedIn & Gmail messages",                     component: <InboxPage /> },
    calendar:  { title: "Calendar",   subtitle: "Google Calendar — meetings & events",           component: <CalendarPage /> },
    analytics: { title: "Analytics",  subtitle: "Performance insights",                         component: <AnalyticsPage /> },
    settings:  { title: "Settings",   subtitle: "Account & preferences",                        component: <SettingsPage /> },
  };

  const current = pages[page];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        current={page} onChange={setPage}
        collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed}
        user={user} onLogout={handleLogout}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar title={current.title} subtitle={current.subtitle} />
        <div className="flex-1 overflow-y-auto">
          {current.component}
        </div>
      </div>
    </div>
  );
}
