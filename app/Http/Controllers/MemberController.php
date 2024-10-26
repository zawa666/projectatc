<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\File;
use Illuminate\Validation\Rule;

class MemberController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search', '');
        
        $members = Member::query()
            ->when($search, function ($query, $search) {
                $query->where(function($q) use ($search) {
                    $q->where('nama', 'like', "%{$search}%")
                      ->orWhere('nik', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%")
                      ->orWhere('spesialisasi', 'like', "%{$search}%");
                });
            })
            ->orderBy('nama')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('MemberData/Index', [
            'members' => $members,
            'filters' => $request->only(['search'])
        ]);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'nama' => 'required|string|max:255',
                'nik' => [
                    'required',
                    'string',
                    Rule::unique('members')->whereNull('deleted_at'),
                    'max:255'
                ],
                'no_telp' => 'required|string|max:255',
                'email' => [
                    'required',
                    'email',
                    Rule::unique('members')->whereNull('deleted_at'),
                    'max:255'
                ],
                'spesialisasi' => 'required|string|max:255',
                'lokasi' => 'required|in:palembang,jambi',
                'photo' => ['required', File::types(['png', 'jpg', 'jpeg'])->max(2048)],
                'medex_file' => ['required', File::types(['pdf'])->max(5120)],
                'medex_expired' => 'required|date',
                'ielp_file' => ['required', File::types(['pdf'])->max(5120)],
                'ielp_expired' => 'required|date',
                'license_file' => ['required', File::types(['pdf'])->max(5120)],
                'license_expired' => 'required|date',
            ]);

            $files = [];

            try {
                // Handle file uploads
                $files['photo'] = $request->file('photo')->store('photos', 'public');
                $files['medex'] = $request->file('medex_file')->store('medex', 'public');
                $files['ielp'] = $request->file('ielp_file')->store('ielp', 'public');
                $files['license'] = $request->file('license_file')->store('license', 'public');

                Member::create([
                    ...$validated,
                    'photo' => $files['photo'],
                    'medex_file' => $files['medex'],
                    'ielp_file' => $files['ielp'],
                    'license_file' => $files['license'],
                ]);

                return redirect()->back()->with('success', 'Member created successfully.');

            } catch (\Exception $e) {
                // Clean up uploaded files if member creation fails
                foreach ($files as $file) {
                    Storage::disk('public')->delete($file);
                }
                throw $e;
            }

        } catch (\Illuminate\Database\UniqueConstraintViolationException $e) {
            return redirect()->back()->withErrors([
                'nik' => 'This NIK is already in use (including in deleted records)',
                'email' => 'This email is already in use (including in deleted records)'
            ])->withInput();

        } catch (\Exception $e) {
            return redirect()->back()->withErrors([
                'error' => 'An error occurred while creating the member. Please try again.'
            ])->withInput();
        }
    }

    public function update(Request $request, Member $member)
    {
        try {
            $validated = $request->validate([
                'nama' => 'required|string|max:255',
                'nik' => [
                    'required',
                    'string',
                    Rule::unique('members')->whereNull('deleted_at')->ignore($member->id),
                    'max:255'
                ],
                'no_telp' => 'required|string|max:255',
                'email' => [
                    'required',
                    'email',
                    Rule::unique('members')->whereNull('deleted_at')->ignore($member->id),
                    'max:255'
                ],
                'spesialisasi' => 'required|string|max:255',
                'lokasi' => 'required|in:palembang,jambi',
                'photo' => ['nullable', File::types(['png', 'jpg', 'jpeg'])->max(2048)],
                'medex_file' => ['nullable', File::types(['pdf'])->max(5120)],
                'medex_expired' => 'required|date',
                'ielp_file' => ['nullable', File::types(['pdf'])->max(5120)],
                'ielp_expired' => 'required|date',
                'license_file' => ['nullable', File::types(['pdf'])->max(5120)],
                'license_expired' => 'required|date',
            ]);

            $oldFiles = [];
            $newFiles = [];

            try {
                if ($request->hasFile('photo')) {
                    $oldFiles[] = $member->photo;
                    $validated['photo'] = $request->file('photo')->store('photos', 'public');
                    $newFiles[] = $validated['photo'];
                }

                if ($request->hasFile('medex_file')) {
                    $oldFiles[] = $member->medex_file;
                    $validated['medex_file'] = $request->file('medex_file')->store('medex', 'public');
                    $newFiles[] = $validated['medex_file'];
                }

                if ($request->hasFile('ielp_file')) {
                    $oldFiles[] = $member->ielp_file;
                    $validated['ielp_file'] = $request->file('ielp_file')->store('ielp', 'public');
                    $newFiles[] = $validated['ielp_file'];
                }

                if ($request->hasFile('license_file')) {
                    $oldFiles[] = $member->license_file;
                    $validated['license_file'] = $request->file('license_file')->store('license', 'public');
                    $newFiles[] = $validated['license_file'];
                }

                $member->update($validated);

                // Delete old files after successful update
                Storage::disk('public')->delete($oldFiles);

                return redirect()->back()->with('success', 'Member updated successfully.');

            } catch (\Exception $e) {
                // Clean up new uploaded files if update fails
                Storage::disk('public')->delete($newFiles);
                throw $e;
            }

        } catch (\Illuminate\Database\UniqueConstraintViolationException $e) {
            return redirect()->back()->withErrors([
                'nik' => 'This NIK is already in use by another member',
                'email' => 'This email is already in use by another member'
            ])->withInput();

        } catch (\Exception $e) {
            return redirect()->back()->withErrors([
                'error' => 'An error occurred while updating the member. Please try again.'
            ])->withInput();
        }
    }

    public function destroy(Request $request, Member $member)
    {
        try {
            $request->validate([
                'password' => 'required|string',
            ]);

            if ($request->password !== '87654321') {
                return redirect()->back()->with('error', 'Invalid delete password.');
            }

            if ($request->has('force_delete') && $request->force_delete) {
                // Hard delete - delete files from storage
                Storage::disk('public')->delete([
                    $member->photo,
                    $member->medex_file,
                    $member->ielp_file,
                    $member->license_file,
                ]);
                $member->forceDelete();
            } else {
                // Soft delete - keep the files
                $member->delete();
            }

            return redirect()->back()->with('success', 'Member deleted successfully.');

        } catch (\Exception $e) {
            return redirect()->back()->withErrors([
                'error' => 'An error occurred while deleting the member. Please try again.'
            ]);
        }
    }

    public function restore($id)
    {
        try {
            $member = Member::withTrashed()->findOrFail($id);
            $member->restore();
            return redirect()->back()->with('success', 'Member restored successfully.');
            
        } catch (\Exception $e) {
            return redirect()->back()->withErrors([
                'error' => 'An error occurred while restoring the member. Please try again.'
            ]);
        }
    }

    public function showFile($type, $filename)
    {
        try {
            $path = storage_path("app/public/{$type}/{$filename}");
            
            if (!Storage::disk('public')->exists("{$type}/{$filename}")) {
                abort(404);
            }

            return response()->file($path);
            
        } catch (\Exception $e) {
            abort(404);
        }
    }
}