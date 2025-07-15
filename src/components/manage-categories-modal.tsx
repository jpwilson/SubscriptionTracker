'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Trash2, Loader2, Palette, Tags, Sparkles, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCategories, useCreateCategory, useDeleteCategory, type Category } from '@/hooks/use-categories'
import { useAuth } from '@/providers/supabase-auth-provider'
import { isPremiumUser } from '@/lib/feature-gates'

interface ManageCategoriesModalProps {
  onClose: () => void
}

const EMOJI_OPTIONS = ['📱', '🎬', '💻', '💰', '❤️', '📚', '🍔', '🚗', '🛍️', '🏠', '✈️', '🎮', '🎵', '📺', '🏋️', '🎨', '📦', '⚡', '🔧', '🌱']
const COLOR_OPTIONS = [
  '#8B5CF6', // Purple
  '#3B82F6', // Blue
  '#10B981', // Green
  '#EF4444', // Red
  '#F59E0B', // Amber
  '#EC4899', // Pink
  '#6366F1', // Indigo
  '#14B8A6', // Teal
  '#F97316', // Orange
  '#84CC16', // Lime
]

export function ManageCategoriesModal({ onClose }: ManageCategoriesModalProps) {
  const { user } = useAuth()
  const isPremium = isPremiumUser(user)
  const { data: categories = [], isLoading } = useCategories()
  const createCategory = useCreateCategory()
  const deleteCategory = useDeleteCategory()
  
  const [showAddForm, setShowAddForm] = useState(false)
  const [newCategory, setNewCategory] = useState({
    name: '',
    color: COLOR_OPTIONS[0],
    icon: EMOJI_OPTIONS[0],
  })

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCategory.name.trim()) return
    
    await createCategory.mutateAsync(newCategory)
    setNewCategory({
      name: '',
      color: COLOR_OPTIONS[0],
      icon: EMOJI_OPTIONS[0],
    })
    setShowAddForm(false)
  }

  const handleDeleteCategory = async (categoryId: string) => {
    if (confirm('Are you sure you want to delete this category? Any subscriptions using this category will be moved to "Other".')) {
      await deleteCategory.mutateAsync(categoryId)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-purple-600 rounded-lg">
                <Tags className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Manage Categories</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
            </div>
          ) : (
            <>
              {/* Add Category Button/Form */}
              <AnimatePresence mode="wait">
                {!showAddForm ? (
                  <motion.div
                    key="button"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mb-6"
                  >
                    {isPremium ? (
                      <Button
                        onClick={() => setShowAddForm(true)}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Custom Category
                      </Button>
                    ) : (
                      <div className="p-4 neu-card rounded-xl border border-purple-500/20">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 rounded-lg bg-purple-500/20">
                            <Lock className="w-5 h-5 text-purple-400" />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                              Add New Category
                              <Sparkles className="w-4 h-4 text-purple-400" />
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              Upgrade to create custom categories or subcategories
                            </p>
                          </div>
                        </div>
                        <Button
                          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg"
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          Upgrade to Premium
                        </Button>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleAddCategory}
                    className="mb-6 p-4 bg-slate-700/50 rounded-lg"
                  >
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Category Name
                        </label>
                        <input
                          type="text"
                          value={newCategory.name}
                          onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="e.g., Gaming, Fitness"
                          autoFocus
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Icon
                        </label>
                        <div className="grid grid-cols-10 gap-2">
                          {EMOJI_OPTIONS.map((emoji) => (
                            <button
                              key={emoji}
                              type="button"
                              onClick={() => setNewCategory({ ...newCategory, icon: emoji })}
                              className={`p-2 rounded-lg text-2xl transition-all ${
                                newCategory.icon === emoji
                                  ? 'bg-purple-600 ring-2 ring-purple-400'
                                  : 'bg-slate-700 hover:bg-slate-600'
                              }`}
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Color
                        </label>
                        <div className="grid grid-cols-10 gap-2">
                          {COLOR_OPTIONS.map((color) => (
                            <button
                              key={color}
                              type="button"
                              onClick={() => setNewCategory({ ...newCategory, color })}
                              className={`w-full h-8 rounded-lg transition-all ${
                                newCategory.color === color
                                  ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-700'
                                  : ''
                              }`}
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowAddForm(false)}
                          className="flex-1 bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                          disabled={createCategory.isPending}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1 bg-purple-600 hover:bg-purple-700"
                          disabled={createCategory.isPending}
                        >
                          {createCategory.isPending ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Creating...
                            </>
                          ) : (
                            'Create Category'
                          )}
                        </Button>
                      </div>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Categories List */}
              <div className="space-y-2">
                {categories.map((category) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                        style={{ backgroundColor: category.color }}
                      >
                        {category.icon}
                      </div>
                      <div>
                        <p className="text-white font-medium">{category.name}</p>
                        {category.isDefault && (
                          <p className="text-xs text-gray-400">Default category</p>
                        )}
                      </div>
                    </div>
                    {!category.isDefault && (
                      <Button
                        onClick={() => handleDeleteCategory(category.id)}
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-red-400 hover:bg-red-400/10"
                        disabled={deleteCategory.isPending}
                      >
                        {deleteCategory.isPending ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </Button>
                    )}
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-700">
          <Button
            onClick={onClose}
            className="w-full bg-slate-700 hover:bg-slate-600"
          >
            Close
          </Button>
        </div>
      </motion.div>
    </div>
  )
}