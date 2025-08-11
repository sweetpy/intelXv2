@@ .. @@
 interface TanzaniaInteractiveMapProps {
   customers: Customer[];
+  isLoading?: boolean;
 }
@@ .. @@
-const TanzaniaInteractiveMap: React.FC<TanzaniaInteractiveMapProps> = ({ customers }) => {
+const TanzaniaInteractiveMap: React.FC<TanzaniaInteractiveMapProps> = ({ customers, isLoading = false }) => {
@@ .. @@
   return (
     <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
+      {isLoading && (
+        <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10 rounded-xl">
+          <div className="text-center">
+            <RefreshCw className="h-8 w-8 text-blue-600 animate-spin mx-auto mb-2" />
+            <p className="text-gray-600">Loading customer data...</p>
+          </div>
+        </div>
+      )}
+      
       <div className="flex items-center justify-between mb-6">
@@ .. @@