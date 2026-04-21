import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Save, Trash2, Plus, LogOut, Layout, Briefcase, Award, Pencil, X, ChevronUp, ChevronDown } from 'lucide-react';
import type { Project, Experience, Certification } from '../data/portfolioData';
import { getProjects, getExperiences, getCertifications, saveLocalData } from '../data/portfolioData';

const ADMIN_PASSWORD = 'admin123';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'projects' | 'experience' | 'certs'>('projects');
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [certs, setCerts] = useState<Certification[]>([]);

  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (sessionStorage.getItem('portfolio_admin_auth')) {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  const loadData = () => {
    setProjects(getProjects());
    setExperience(getExperiences());
    setCerts(getCertifications());
  };

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('portfolio_admin_auth', 'true');
      setPassword(''); // Clear password after login
      loadData();
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('portfolio_admin_auth');
    setIsAuthenticated(false);
  };

  const resetForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormData({});
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    // Convert arrays back to comma-separated strings for inputs
    const editData = { ...item };
    if (activeTab === 'projects' && item.techStack) {
      editData.techStack = item.techStack.join(', ');
    }
    if (activeTab === 'experience' && item.skills) {
      editData.skills = item.skills.join(', ');
    }
    setFormData(editData);
    setIsFormOpen(true);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    const id = editingId || Date.now().toString();
    
    if (activeTab === 'projects') {
      const updatedItem: Project = {
        ...formData,
        id,
        featured: !!formData.featured,
        techStack: typeof formData.techStack === 'string' 
          ? formData.techStack.split(',').map((s: string) => s.trim()).filter((s: string) => s !== '') 
          : (formData.techStack || []),
        category: formData.category || 'Other'
      };
      
      const updatedList = editingId 
        ? projects.map(p => p.id === editingId ? updatedItem : p)
        : [updatedItem, ...projects];
        
      setProjects(updatedList);
      saveLocalData('portfolio_projects', updatedList);
    } else if (activeTab === 'experience') {
      const updatedItem: Experience = {
        ...formData,
        id,
        skills: typeof formData.skills === 'string'
          ? formData.skills.split(',').map((s: string) => s.trim()).filter((s: string) => s !== '')
          : (formData.skills || []),
        type: formData.type || 'Other'
      };
      
      const updatedList = editingId
        ? experience.map(e => e.id === editingId ? updatedItem : e)
        : [updatedItem, ...experience];
        
      setExperience(updatedList);
      saveLocalData('portfolio_experience', updatedList);
    } else {
      const updatedItem: Certification = { ...formData, id };
      const updatedList = editingId
        ? certs.map(c => c.id === editingId ? updatedItem : c)
        : [updatedItem, ...certs];
        
      setCerts(updatedList);
      saveLocalData('portfolio_certifications', updatedList);
    }
    
    resetForm();
  };

  const deleteItem = (id: string, type: 'projects' | 'experience' | 'certs') => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    if (type === 'projects') {
      const updated = projects.filter(p => p.id !== id);
      setProjects(updated);
      saveLocalData('portfolio_projects', updated);
    } else if (type === 'experience') {
      const updated = experience.filter(e => e.id !== id);
      setExperience(updated);
      saveLocalData('portfolio_experience', updated);
    } else {
      const updated = certs.filter(c => c.id !== id);
      setCerts(updated);
      saveLocalData('portfolio_certifications', updated);
    }
  };

  const moveItem = (index: number, direction: 'up' | 'down', type: 'projects' | 'experience' | 'certs') => {
    let list: any[];
    let setList: any;
    let storageKey: string;

    if (type === 'projects') {
      list = [...projects];
      setList = setProjects;
      storageKey = 'portfolio_projects';
    } else if (type === 'experience') {
      list = [...experience];
      setList = setExperience;
      storageKey = 'portfolio_experience';
    } else {
      list = [...certs];
      setList = setCerts;
      storageKey = 'portfolio_certifications';
    }

    if (direction === 'up' && index > 0) {
      [list[index - 1], list[index]] = [list[index], list[index - 1]];
    } else if (direction === 'down' && index < list.length - 1) {
      [list[index + 1], list[index]] = [list[index], list[index + 1]];
    } else {
      return;
    }

    setList(list);
    saveLocalData(storageKey, list);
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-6 py-20 flex justify-center">
        <div className="glass-card p-12 w-full max-w-md text-center space-y-8">
          <div className="w-20 h-20 bg-brand/10 text-brand rounded-full flex items-center justify-center mx-auto shadow-inner">
            <Lock size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight">Admin Authentication</h1>
            <p className="text-text-muted text-sm mt-2">Enter your password to manage portfolio content.</p>
          </div>
          <div className="space-y-4">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="Admin Password"
              className="w-full bg-bg border border-border focus:border-brand rounded-2xl p-4 outline-none transition-all placeholder:text-text-muted/50"
            />
            {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
            <button 
              onClick={handleLogin}
              className="w-full py-4 bg-grad-primary text-white rounded-2xl font-black shadow-lg hover:shadow-glow transition-all"
            >
              Sign In →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 lg:px-12 py-12">
      <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
        <div>
          <h1 className="text-3xl font-black tracking-tighter flex items-center gap-3">
            Admin Dashboard <span className="bg-brand/10 text-brand text-[10px] px-2 py-1 rounded-full uppercase tracking-widest border border-brand/20">Authorized</span>
          </h1>
          <p className="text-text-secondary mt-1">Manage your professional content and resume data.</p>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-6 py-2.5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all shadow-sm"
        >
          Sign Out <LogOut size={18} />
        </button>
      </header>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 bg-bg-card/50 p-1.5 rounded-2xl border border-border w-fit backdrop-blur-md">
        {[
          { icon: <Layout size={16} />, label: 'Projects', key: 'projects' },
          { icon: <Briefcase size={16} />, label: 'Experience', key: 'experience' },
          { icon: <Award size={16} />, label: 'Certifications', key: 'certs' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => { setActiveTab(tab.key as any); resetForm(); }}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
              activeTab === tab.key 
                ? 'bg-grad-primary text-white shadow-lg' 
                : 'text-text-secondary hover:text-text-primary hover:bg-bg-glass'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="glass-card mb-8">
        <div className="p-8 border-b border-border flex justify-between items-center">
            <h2 className="text-xl font-black capitalize tracking-tight flex items-center gap-2">
                Manage {activeTab} 
                <span className="text-xs font-bold text-text-muted bg-bg px-2 py-1 rounded-md border border-border">
                    {activeTab === 'projects' ? projects.length : activeTab === 'experience' ? experience.length : certs.length} total
                </span>
            </h2>
            {!isFormOpen && (
              <button 
                onClick={() => setIsFormOpen(true)}
                className="flex items-center gap-2 bg-brand text-white px-5 py-2.5 rounded-xl font-bold shadow-lg hover:scale-105 active:scale-95 transition-all text-sm"
              >
                  <Plus size={16} /> Add New
              </button>
            )}
        </div>

        <div className="p-4">
           <AnimatePresence mode="wait">
             {isFormOpen ? (
               <motion.form 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 onSubmit={handleSaveItem}
                 className="p-6 space-y-6 bg-bg/30 rounded-3xl border border-brand/20"
               >
                 <div className="flex justify-between items-center mb-2">
                    <h3 className="font-black text-brand uppercase tracking-widest text-xs">
                        {editingId ? 'Edit Existing' : 'Add New'} {activeTab.slice(0, -1)}
                    </h3>
                    <button type="button" onClick={resetForm} className="text-text-muted hover:text-brand transition-colors">
                        <X size={20} />
                    </button>
                 </div>

                 <div className="grid md:grid-cols-2 gap-6">
                   {activeTab === 'projects' && (
                     <>
                       <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Project Title</label>
                         <input required type="text" value={formData.title || ''} placeholder="e.g. Portfolio Website" className="w-full bg-bg border border-border rounded-xl p-3.5 outline-none focus:border-brand" onChange={e => setFormData({...formData, title: e.target.value})} />
                       </div>
                       <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Category</label>
                         <select required value={formData.category || 'Web'} className="w-full bg-bg border border-border rounded-xl p-3.5 outline-none focus:border-brand" onChange={e => setFormData({...formData, category: e.target.value})}>
                           <option value="Web">Web</option>
                           <option value="AI/ML">AI/ML</option>
                           <option value="Mobile">Mobile</option>
                           <option value="Cloud">Cloud</option>
                           <option value="Other">Other</option>
                         </select>
                       </div>
                       <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Image URL</label>
                         <input required type="text" value={formData.image || ''} placeholder="e.g. /assets/project.png" className="w-full bg-bg border border-border rounded-xl p-3.5 outline-none focus:border-brand" onChange={e => setFormData({...formData, image: e.target.value})} />
                       </div>
                       <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Tech Stack (comma separated)</label>
                         <input required type="text" value={formData.techStack || ''} placeholder="React, Node, Tailwind" className="w-full bg-bg border border-border rounded-xl p-3.5 outline-none focus:border-brand" onChange={e => setFormData({...formData, techStack: e.target.value})} />
                       </div>
                       <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Live Demo URL</label>
                         <input type="text" value={formData.liveUrl || ''} placeholder="https://..." className="w-full bg-bg border border-border rounded-xl p-3.5 outline-none focus:border-brand" onChange={e => setFormData({...formData, liveUrl: e.target.value})} />
                       </div>
                       <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">GitHub Repo URL</label>
                         <input type="text" value={formData.githubUrl || ''} placeholder="https://github.com/..." className="w-full bg-bg border border-border rounded-xl p-3.5 outline-none focus:border-brand" onChange={e => setFormData({...formData, githubUrl: e.target.value})} />
                       </div>
                       <div className="md:col-span-2 space-y-2">
                         <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Description</label>
                         <textarea required rows={3} value={formData.description || ''} className="w-full bg-bg border border-border rounded-xl p-3.5 outline-none focus:border-brand" onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
                       </div>
                       <div className="flex items-center gap-2 ml-1">
                         <input type="checkbox" id="featured" checked={!!formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="w-4 h-4 rounded text-brand focus:ring-brand" />
                         <label htmlFor="featured" className="text-xs font-bold uppercase tracking-widest text-text-muted">Feature this project</label>
                       </div>
                     </>
                   )}

                   {activeTab === 'experience' && (
                     <>
                       <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Role / Position</label>
                         <input required type="text" value={formData.role || ''} placeholder="e.g. Senior Developer" className="w-full bg-bg border border-border rounded-xl p-3.5 outline-none focus:border-brand" onChange={e => setFormData({...formData, role: e.target.value})} />
                       </div>
                       <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Company / Organization</label>
                         <input required type="text" value={formData.company || ''} placeholder="e.g. Tech Corp" className="w-full bg-bg border border-border rounded-xl p-3.5 outline-none focus:border-brand" onChange={e => setFormData({...formData, company: e.target.value})} />
                       </div>
                       <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Duration</label>
                         <input required type="text" value={formData.duration || ''} placeholder="e.g. Jan 2023 - Present" className="w-full bg-bg border border-border rounded-xl p-3.5 outline-none focus:border-brand" onChange={e => setFormData({...formData, duration: e.target.value})} />
                       </div>
                       <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Type</label>
                         <select required value={formData.type || 'Work'} className="w-full bg-bg border border-border rounded-xl p-3.5 outline-none focus:border-brand" onChange={e => setFormData({...formData, type: e.target.value})}>
                           <option value="Work">Work</option>
                           <option value="Education">Education</option>
                           <option value="Freelance">Freelance</option>
                           <option value="Internship">Internship</option>
                         </select>
                       </div>
                       <div className="md:col-span-2 space-y-2">
                         <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Key Skills / Points (comma separated)</label>
                         <input required type="text" value={formData.skills || ''} placeholder="Software Design, Project Management, C++" className="w-full bg-bg border border-border rounded-xl p-3.5 outline-none focus:border-brand" onChange={e => setFormData({...formData, skills: e.target.value})} />
                       </div>
                       <div className="md:col-span-2 space-y-2">
                         <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Key Responsibilities / Description</label>
                         <textarea required rows={3} value={formData.description || ''} className="w-full bg-bg border border-border rounded-xl p-3.5 outline-none focus:border-brand" onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
                       </div>
                     </>
                   )}

                   {activeTab === 'certs' && (
                     <>
                       <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Certification Name</label>
                         <input required type="text" value={formData.name || ''} placeholder="e.g. AWS Solutions Architect" className="w-full bg-bg border border-border rounded-xl p-3.5 outline-none focus:border-brand" onChange={e => setFormData({...formData, name: e.target.value})} />
                       </div>
                       <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Issuing Organization</label>
                         <input required type="text" value={formData.issuer || ''} placeholder="e.g. Amazon" className="w-full bg-bg border border-border rounded-xl p-3.5 outline-none focus:border-brand" onChange={e => setFormData({...formData, issuer: e.target.value})} />
                       </div>
                       <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Date Received</label>
                         <input required type="text" value={formData.date || ''} placeholder="e.g. Dec 2023" className="w-full bg-bg border border-border rounded-xl p-3.5 outline-none focus:border-brand" onChange={e => setFormData({...formData, date: e.target.value})} />
                       </div>
                       <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Credential Link (optional)</label>
                         <input type="text" value={formData.credentialUrl || ''} placeholder="e.g. https://..." className="w-full bg-bg border border-border rounded-xl p-3.5 outline-none focus:border-brand" onChange={e => setFormData({...formData, credentialUrl: e.target.value})} />
                       </div>
                     </>
                   )}
                 </div>

                 <div className="flex justify-end gap-3 pt-4">
                   <button type="button" onClick={resetForm} className="px-6 py-2.5 rounded-xl font-bold text-text-muted hover:bg-bg-glass transition-all">Cancel</button>
                   <button type="submit" className="flex items-center gap-2 bg-brand text-white px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-brand/20 hover:scale-105 transition-all">
                     <Save size={18} /> {editingId ? 'Update' : 'Save'} {activeTab === 'certs' ? 'Certification' : activeTab.slice(0, -1)}
                   </button>
                 </div>
               </motion.form>
             ) : (
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="space-y-3"
               >
                 {activeTab === 'projects' && projects.map((p, index) => (
                   <div key={p.id} className="flex items-center justify-between p-5 bg-bg/50 rounded-2xl border border-border hover:border-brand/40 transition-colors group">
                      <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl overflow-hidden border border-border p-1 bg-white">
                              <img src={p.image} alt="" className="w-full h-full object-cover rounded-lg" />
                          </div>
                          <div>
                              <div className="font-black text-text-primary flex items-center gap-2 text-sm md:text-base">
                                  {p.title}
                                  {p.featured && <span className="text-[8px] bg-yellow-400 text-black px-1.5 py-0.5 rounded-full font-black uppercase">Featured</span>}
                              </div>
                              <div className="text-[10px] text-text-muted font-bold uppercase tracking-widest">{p.category}</div>
                          </div>
                      </div>
                      <div className="flex items-center gap-2">
                          <div className="flex gap-1 pr-4 mr-2 border-r border-border hidden sm:flex">
                              <button onClick={() => moveItem(index, 'up', 'projects')} disabled={index === 0} className="p-1.5 text-text-muted hover:text-brand disabled:opacity-30 disabled:hover:text-text-muted rounded-md transition-all">
                                  <ChevronUp size={16} />
                              </button>
                              <button onClick={() => moveItem(index, 'down', 'projects')} disabled={index === projects.length - 1} className="p-1.5 text-text-muted hover:text-brand disabled:opacity-30 disabled:hover:text-text-muted rounded-md transition-all">
                                  <ChevronDown size={16} />
                              </button>
                          </div>
                          <button 
                              onClick={() => handleEdit(p)}
                              className="p-3 text-text-muted hover:text-brand hover:bg-brand/10 rounded-xl transition-all"
                          >
                              <Pencil size={18} />
                          </button>
                          <button 
                              onClick={() => deleteItem(p.id, 'projects')}
                              className="p-3 text-text-muted hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                          >
                              <Trash2 size={18} />
                          </button>
                      </div>
                   </div>
                 ))}

                 {activeTab === 'experience' && experience.map((e, index) => (
                   <div key={e.id} className="flex items-center justify-between p-5 bg-bg/50 rounded-2xl border border-border hover:border-brand/40 transition-colors group">
                      <div>
                          <div className="font-black text-text-primary text-sm md:text-base">{e.role} at <span className="text-brand">{e.company}</span></div>
                          <div className="text-[10px] text-text-muted font-bold uppercase tracking-widest">{e.type} · {e.duration}</div>
                      </div>
                      <div className="flex items-center gap-2">
                          <div className="flex gap-1 pr-4 mr-2 border-r border-border hidden sm:flex">
                              <button onClick={() => moveItem(index, 'up', 'experience')} disabled={index === 0} className="p-1.5 text-text-muted hover:text-brand disabled:opacity-30 disabled:hover:text-text-muted rounded-md transition-all">
                                  <ChevronUp size={16} />
                              </button>
                              <button onClick={() => moveItem(index, 'down', 'experience')} disabled={index === experience.length - 1} className="p-1.5 text-text-muted hover:text-brand disabled:opacity-30 disabled:hover:text-text-muted rounded-md transition-all">
                                  <ChevronDown size={16} />
                              </button>
                          </div>
                          <button 
                              onClick={() => handleEdit(e)}
                              className="p-3 text-text-muted hover:text-brand hover:bg-brand/10 rounded-xl transition-all"
                          >
                              <Pencil size={18} />
                          </button>
                          <button 
                              onClick={() => deleteItem(e.id, 'experience')}
                              className="p-3 text-text-muted hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                          >
                              <Trash2 size={18} />
                          </button>
                      </div>
                   </div>
                 ))}

                 {activeTab === 'certs' && certs.map((c, index) => (
                   <div key={c.id} className="flex items-center justify-between p-5 bg-bg/50 rounded-2xl border border-border hover:border-brand/40 transition-colors group">
                      <div>
                          <div className="font-black text-text-primary text-sm md:text-base">{c.name}</div>
                          <div className="text-[10px] text-text-muted font-bold uppercase tracking-widest">{c.issuer} · {c.date}</div>
                      </div>
                      <div className="flex items-center gap-2">
                          <div className="flex gap-1 pr-4 mr-2 border-r border-border hidden sm:flex">
                              <button onClick={() => moveItem(index, 'up', 'certs')} disabled={index === 0} className="p-1.5 text-text-muted hover:text-brand disabled:opacity-30 disabled:hover:text-text-muted rounded-md transition-all">
                                  <ChevronUp size={16} />
                              </button>
                              <button onClick={() => moveItem(index, 'down', 'certs')} disabled={index === certs.length - 1} className="p-1.5 text-text-muted hover:text-brand disabled:opacity-30 disabled:hover:text-text-muted rounded-md transition-all">
                                  <ChevronDown size={16} />
                              </button>
                          </div>
                          <button 
                              onClick={() => handleEdit(c)}
                              className="p-3 text-text-muted hover:text-brand hover:bg-brand/10 rounded-xl transition-all"
                          >
                              <Pencil size={18} />
                          </button>
                          <button 
                              onClick={() => deleteItem(c.id, 'certs')}
                              className="p-3 text-text-muted hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                          >
                              <Trash2 size={18} />
                          </button>
                      </div>
                   </div>
                 ))}

                 {((activeTab === 'projects' && !projects.length) || 
                   (activeTab === 'experience' && !experience.length) || 
                   (activeTab === 'certs' && !certs.length)) && (
                   <div className="text-center py-16">
                      <div className="text-4xl opacity-20 mb-4">📭</div>
                      <div className="text-text-muted font-bold uppercase tracking-widest text-xs">No items found in this section.</div>
                   </div>
                 )}
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>
      
      <div className="text-center text-text-muted text-[10px] font-bold mt-12 bg-bg-card/50 p-4 rounded-2xl border border-border uppercase tracking-widest">
        🔐 Admin Data is persisted in Local Storage. Changes are reflected immediately across the site.
      </div>
    </div>
  );
};

export default Admin;
