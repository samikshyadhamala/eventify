'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button" // Changed from radix-ui to local button component

export default function Settings() {
    return (
        <div className="p-4">
            <CardHeader>
                <h2>Branch Settings</h2>
                <CardDescription>Manage your branch profile and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <h3 className="text-lg font-medium">Branch Profile</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="branch-name">Branch Name</Label>
                            <Input id="branch-name" defaultValue="Tech Hub" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="branch-email">Contact Email</Label>
                            <Input id="branch-email" type="email" defaultValue="techhub@example.com" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="branch-phone">Contact Phone</Label>
                            <Input id="branch-phone" defaultValue="(555) 123-4567" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="branch-location">Location</Label>
                            <Input id="branch-location" defaultValue="Downtown Tech District" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="branch-description">Description</Label>
                        <Textarea
                            id="branch-description"
                            defaultValue="The Tech Hub branch focuses on technology-related events, workshops, and networking opportunities for tech professionals and enthusiasts."
                            rows={4}
                        />
                    </div>
                </div>
                <Separator />
                <div className="space-y-2">
                    <h3 className="text-lg font-medium">Event Settings</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="default-capacity">Default Event Capacity</Label>
                            <Input id="default-capacity" type="number" defaultValue="50" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="registration-deadline">Default Registration Deadline</Label>
                            <Select defaultValue="1">
                                <SelectTrigger id="registration-deadline">
                                    <SelectValue placeholder="Select deadline" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">1 day before event</SelectItem>
                                    <SelectItem value="2">2 days before event</SelectItem>
                                    <SelectItem value="3">3 days before event</SelectItem>
                                    <SelectItem value="7">1 week before event</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                        <Switch id="approval-required" />
                        <Label htmlFor="approval-required">Require approval for event registrations</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch id="waitlist" defaultChecked />
                        <Label htmlFor="waitlist">Enable waitlist when events are full</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch id="notifications" defaultChecked />
                        <Label htmlFor="notifications">Send email notifications for new registrations</Label>
                    </div>
                </div>
                <Separator />
                <div className="space-y-2">
                    <h3 className="text-lg font-medium">Payment Settings</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="payment-method">Default Payment Method</Label>
                            <Select defaultValue="stripe">
                                <SelectTrigger id="payment-method">
                                    <SelectValue placeholder="Select payment method" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="stripe">Stripe</SelectItem>
                                    <SelectItem value="paypal">PayPal</SelectItem>
                                    <SelectItem value="bank">Bank Transfer</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="currency">Currency</Label>
                            <Select defaultValue="usd">
                                <SelectTrigger id="currency">
                                    <SelectValue placeholder="Select currency" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="usd">USD ($)</SelectItem>
                                    <SelectItem value="eur">EUR (€)</SelectItem>
                                    <SelectItem value="gbp">GBP (£)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                        <Switch id="receipts" defaultChecked />
                        <Label htmlFor="receipts">Automatically send receipts for payments</Label>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
            </CardFooter>
        </div>
    )
}